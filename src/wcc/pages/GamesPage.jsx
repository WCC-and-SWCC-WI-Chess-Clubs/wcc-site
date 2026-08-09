// src/wcc/pages/GamesPage.jsx — ported from the old waukeshachessclub.com/games.html
import SiteFooter from '../SiteFooter.jsx';

// Collection files (.2cbv / ChessBase) are served locally from
// public/downloads/games/ — nothing on this page points back to
// waukeshachessclub.com.
const COLLECTIONS = [
  {
    name: 'Positional Chess Handbook',
    count: 271,
    notes: 'Through Chapter 12',
    cbh: '/downloads/games/Positional%20Chess%20Handbook%20-%20Gelfer.2cbv',
    textAuthor: 'Gelfer',
    collectionAuthor: 'DeMastri',
    updated: '8-Apr-25',
  },
  {
    name: 'Reassess Your Chess (4th ed)',
    count: 202,
    notes: 'Through Part Four',
    cbh: '/downloads/games/Reassess%20Your%20Chess%20-%20Silman.2cbv',
    textAuthor: 'Silman',
    collectionAuthor: 'DeMastri',
    updated: '7-May-25',
  },
  {
    name: 'Complete Endgame Course',
    count: 81,
    notes: 'Includes Part Four and Five (Class C, B)',
    cbh: '/downloads/games/Silman%20-%20Complete%20Endgame%20Course.2cbv',
    textAuthor: 'Silman',
    collectionAuthor: 'DeMastri',
    updated: '7-May-25',
  },
  {
    name: 'Simple Chess',
    count: 60,
    notes: 'Complete',
    cbh: '/downloads/games/Simple%20Chess.2cbv',
    textAuthor: 'Stean',
    collectionAuthor: 'DeMastri',
    updated: '8-Apr-25',
  },
];

export default function GamesPage({ onNavigate }) {
  return (
    <div className="page-shell">
      <div className="page-hero">
        <p className="eyebrow">Waukesha Chess Club</p>
        <h1>Games and Collections</h1>
      </div>
      <div className="page-inner wide">

        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7 }}>
          As mentioned on the blog, we'd like to start collecting interesting (or other) games
          from club play. Since we haven't gotten much response for that — I'm going to post a
          few game collections for books and various chessable courses as I have time. I will
          periodically keep these up to date, as I actually find time to study... if you want
          anything specific, let me know at{' '}
          <a href="mailto:chess@demastri.com">chess@demastri.com</a>.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7 }}>
          The copyright rule is that you should own some version of the text to use the
          annotations and commentary, but actual game scores are public domain... (If you need
          to, maybe you could borrow the text from the WCC library...)
        </p>

        <div className="links-section">
          <h3>Games</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="sched-table games-table">
              <thead>
                <tr>
                  <th colSpan={2}>Players</th>
                  <th>Date</th>
                  <th>Tournament</th>
                  <th>Result</th>
                  <th>Notation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2} style={{ fontStyle: 'italic', opacity: 0.6 }}>So many empty...</td>
                  <td colSpan={2}>
                    Send games to include here... to{' '}
                    <a href="mailto:chess@demastri.com">chess@demastri.com</a>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="links-section">
          <h3>Collections</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="sched-table games-table">
              <thead>
                <tr>
                  <th colSpan={2}>Collection Name</th>
                  <th>Game Count</th>
                  <th>Notes</th>
                  <th colSpan={2}>Files</th>
                  <th>Text Author</th>
                  <th>Collection Author</th>
                  <th>Update Date</th>
                </tr>
              </thead>
              <tbody>
                {COLLECTIONS.map(c => (
                  <tr key={c.name}>
                    <td colSpan={2}>{c.name}</td>
                    <td>{c.count}</td>
                    <td>{c.notes}</td>
                    <td><a href={c.cbh} target="_blank" rel="noreferrer">CBH ↓</a></td>
                    <td style={{ opacity: 0.5 }}>PGN</td>
                    <td>{c.textAuthor}</td>
                    <td>{c.collectionAuthor}</td>
                    <td>{c.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            "PGN" columns are placeholders on the original page — no PGN export has been posted
            for these collections yet.
          </p>
        </div>

      </div>
      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
