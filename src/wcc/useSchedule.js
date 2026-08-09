// src/wcc/useSchedule.js — fetch a club schedule published from Google Sheets as CSV
// (identical to src/swcc/useSchedule.js — kept as a per-subsite copy to
// match this project's convention of not sharing code across subsites)
import { useEffect, useState } from 'react';

// One fetch per URL per page session, shared across every component that
// asks for it (e.g. remounting HomePage on nav doesn't re-hit the network).
const cache = new Map(); // csvUrl -> Promise<rows>

function fetchAndParse(csvUrl) {
  if (!cache.has(csvUrl)) {
    const promise = fetch(csvUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Schedule fetch failed: ${res.status}`);
        return res.text();
      })
      .then(parseScheduleCSV)
      .catch((err) => {
        cache.delete(csvUrl); // don't poison the cache — allow a retry on next mount
        throw err;
      });
    cache.set(csvUrl, promise);
  }
  return cache.get(csvUrl);
}

/**
 * Loads and parses a schedule CSV published from Google Sheets.
 * Returns { rows, error } — rows is null until loaded, error is null unless
 * the fetch/parse failed.
 */
export function useSchedule(csvUrl) {
  const [state, setState] = useState({ rows: null, error: null });

  useEffect(() => {
    let cancelled = false;
    fetchAndParse(csvUrl)
      .then((rows) => {
        if (!cancelled) setState({ rows, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ rows: null, error });
      });
    return () => {
      cancelled = true;
    };
  }, [csvUrl]);

  return state;
}

/** Minimal RFC4180 CSV parser — handles quoted fields with embedded commas/quotes/newlines. */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field !== '' || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Formats a Date as "Mmm dd, yyyy", e.g. "Jul 09, 2026". */
function formatDate(d) {
  const dd = String(d.getDate()).padStart(2, '0');
  return `${MONTH_ABBR[d.getMonth()]} ${dd}, ${d.getFullYear()}`;
}

/**
 * Parses a date cell from the sheet into a local-time Date, or null if it
 * can't be parsed. Handles the formats Sheets is likely to export a Date
 * column as ("2026-07-09", "7/9/2026", "July 9, 2026") explicitly rather
 * than relying solely on `new Date(str)` — bare "YYYY-MM-DD" strings are
 * parsed as UTC midnight per spec, which can shift a day off in local time
 * depending on the browser's timezone.
 */
function parseDateLoose(str) {
  const s = str.trim();

  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]);

  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return new Date(+m[3], +m[1] - 1, +m[2]);

  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Converts raw schedule CSV text into { date, event, highlight, note } rows,
 * sorted chronologically. Expects a header row containing "Date", "Event",
 * and "Style" (any order, extra columns like "Timestamp" are ignored).
 * Style is "Highlight", "Note", or anything else (treated as neither).
 */
function parseScheduleCSV(text) {
  const table = parseCSV(text);
  if (!table.length) return [];

  const header = table[0].map((h) => h.trim().toLowerCase());
  const idx = {
    date: header.indexOf('date'),
    event: header.indexOf('event'),
    style: header.indexOf('style'),
  };

  // Hide events more than 8 days in the past. Rows we couldn't parse a date
  // for are kept regardless — better to show an unclassifiable row than
  // silently hide it.
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(cutoff.getDate() - 8);
  const cutoffTime = cutoff.getTime();

  return table
    .slice(1)
    .filter((r) => r.some((cell) => cell.trim() !== ''))
    .map((r) => {
      const dateStr = (r[idx.date] || '').trim();
      const style = (r[idx.style] || '').trim().toLowerCase();
      const parsed = parseDateLoose(dateStr);
      return {
        // Fall back to the raw cell text if we can't parse it, rather than
        // silently dropping the row or showing "Invalid Date".
        date: parsed ? formatDate(parsed) : dateStr,
        event: (r[idx.event] || '').trim(),
        highlight: style === 'highlight',
        note: style === 'note',
        _sortKey: parsed ? parsed.getTime() : NaN, // NaN sorts to the end, not the front
      };
    })
    .filter((row) => Number.isNaN(row._sortKey) || row._sortKey >= cutoffTime)
    .sort((a, b) => {
      if (Number.isNaN(a._sortKey)) return 1;
      if (Number.isNaN(b._sortKey)) return -1;
      return a._sortKey - b._sortKey;
    });
}
