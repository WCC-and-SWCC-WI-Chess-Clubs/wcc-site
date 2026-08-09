// src/wcc/pages/SchedulePage.jsx
import { SCHEDULE_CSV_URL, BLOG_URL } from '../data/index.js';
import { useSchedule } from '../useSchedule.js';
import SiteFooter from '../SiteFooter.jsx';

export default function SchedulePage({ onNavigate }) {
  const { rows: schedule, error: scheduleError } = useSchedule(SCHEDULE_CSV_URL);

  return (
    <div className="page-shell">
      <div className="page-hero">
        <p className="eyebrow">Waukesha Chess Club</p>
        <h1>Schedule</h1>
      </div>
      <div className="page-inner">
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          All events are Wednesday evenings · Games begin at 7:00pm
        </p>
        {scheduleError ? (
          <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '2rem' }}>
            Couldn't load the schedule right now — check{' '}
            <a href={BLOG_URL} target="_blank" rel="noreferrer">our blog</a>{' '}
            for the latest, or try refreshing.
          </p>
        ) : !schedule ? (
          <p style={{ color: 'var(--text-muted)', marginTop: '2rem' }}>Loading schedule…</p>
        ) : (
        <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
          <table className="sched-table">
            <thead>
              <tr><th>Date</th><th>Event</th></tr>
            </thead>
            <tbody>
              {schedule.map((row, i) => (
                <tr
                  key={i}
                  className={row.highlight ? 'highlight' : row.note ? 'note' : ''}
                >
                  <td>{row.date}</td>
                  <td>{row.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
        <div className="scoresheet-box">
          <h3>Scoresheet Downloads</h3>
          <a href="/downloads/uscf_scoresheet.pdf" target="_blank" rel="noreferrer">
            USCF Scoresheet (portrait, 1 per page; full size) ↓
          </a>
          <a href="/downloads/uscf_scoresheet_2up.pdf" target="_blank" rel="noreferrer">
            USCF Scoresheet (landscape, 2 per page; ½ size) ↓
          </a>
        </div>
      </div>
      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
