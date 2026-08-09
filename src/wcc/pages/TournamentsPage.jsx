// src/wcc/pages/TournamentsPage.jsx
import { TOURNAMENTS } from '../data/index.js';
import SiteFooter from '../SiteFooter.jsx';

export default function TournamentsPage({ onNavigate }) {
  return (
    <div className="page-shell">
      <div className="page-hero">
        <p className="eyebrow">Waukesha Chess Club</p>
        <h1>Past Tournaments</h1>
      </div>
      <div className="page-inner wide">
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Results linked to USCF event pages
        </p>
        {Object.entries(TOURNAMENTS)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, events]) => (
          <div key={year} className="tourney-year-section">
            <div className="tourney-year-header">{year}</div>
            <ul className="tourney-list">
              {events.map((event, i) => (
                <li key={i}>
                  <a href={event.url} target="_blank" rel="noreferrer">
                    {event.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
