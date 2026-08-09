// src/wcc/pages/LinksPage.jsx
import SiteFooter from '../SiteFooter.jsx';

const CHESS_LINKS = [
  { label: 'Waukesha Chess Club Blog', url: 'http://waukeshachessclub.blogspot.com/' },
  { label: 'Past WCC Tournaments on USCF', url: 'https://ratings.uschess.org/affiliate/A5008948' },
  { label: 'USCF — US Chess Federation', url: 'https://new.uschess.org/home/' },
  { label: 'Search USCF for Upcoming Tournaments in WI', url: 'http://www.uschess.org/tlas/upcoming.php?STATE=WI' },
  { label: 'Wisconsin Top 100 Players', url: 'http://www.uschess.org/datapage/top-players2.php?state=WI&limit=&maxcnt=200&players=M&rtgsys=R&current=C' },
];

const WI_CHESS_LINKS = [
  { label: 'Wisconsin Chess Association', url: 'http://www.wischess.org/' },
  { label: 'WCA — 2025 Wisconsin Tour', url: 'https://www.wischess.org/index.php/past-tournaments/wi-tour/158-current-tour' },
  { label: 'Southwest Chess Club', url: '/swcc' },
];

const WI_TOURNAMENTS = [
  {
    date: 'October 03, 2026',
    name: 'Hales Corners Challenge XXXIX (SWCC)',
    links: [
      { label: 'info', url: '/swcc' },
      { label: 'register', url: 'https://www.kingregistration.com/event/HCC39' },
    ],
  },
  {
    date: 'Weekly',
    name: 'Wednesdays at Waukesha Chess Club · Thursdays at Southwest Chess Club',
    links: [],
  },
];

export default function LinksPage({ onNavigate }) {
  return (
    <div className="page-shell">
      <div className="page-hero">
        <p className="eyebrow">Waukesha Chess Club</p>
        <h1>Links</h1>
      </div>
      <div className="page-inner">

        <div className="links-section">
          <h3>Chess Resources</h3>
          <ul className="link-list">
            {CHESS_LINKS.map(l => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="links-section">
          <h3>Wisconsin Chess</h3>
          <ul className="link-list">
            {WI_CHESS_LINKS.map(l => (
              <li key={l.url}>
                {l.url.startsWith('/') ? (
                  <a href={l.url}>{l.label}</a>
                ) : (
                  <a href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="links-section">
          <h3>Tournaments in Wisconsin</h3>
          <table className="tourney-wi-table">
            <tbody>
              {WI_TOURNAMENTS.map((t, i) => (
                <tr key={i}>
                  <td>{t.date}</td>
                  <td>
                    {t.name}
                    {t.links.length > 0 && (
                      <span> — {t.links.map((l, j) => (
                        <span key={j}>
                          {j > 0 && ' · '}
                          {l.url.startsWith('/') ? (
                            <a href={l.url}>{l.label}</a>
                          ) : (
                            <a href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
                          )}
                        </span>
                      ))}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Full list at{' '}
            <a href="https://www.kingregistration.com/tournaments/state/WI" target="_blank" rel="noreferrer" style={{ color: 'var(--gold)' }}>
              King Registration
            </a>
            {' · '}
            Madison area events by{' '}
            <a href="https://www.growthchess.com/events" target="_blank" rel="noreferrer" style={{ color: 'var(--gold)' }}>
              Growth Chess
            </a>
          </p>
        </div>

      </div>
      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
