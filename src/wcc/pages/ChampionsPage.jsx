// src/wcc/pages/ChampionsPage.jsx
import { CHAMPIONS } from '../data/index.js';
import SiteFooter from '../SiteFooter.jsx';

function ChampCell({ entry }) {
  if (!entry) return <span className="na-cell">—</span>;
  if (entry.url) return <a href={entry.url} target="_blank" rel="noreferrer">{entry.name}</a>;
  return <span>{entry.name}</span>;
}

export default function ChampionsPage({ onNavigate }) {
  return (
    <div className="page-shell">
      <div className="page-hero">
        <p className="eyebrow">Waukesha Chess Club</p>
        <h1>Our Champions</h1>
      </div>
      <div className="page-inner wide">
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
          Honoring our club history · Names link to USCF event results
        </p>
        <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
          <table className="champs-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Club Champion</th>
                <th>Waukesha Memorial Champion</th>
              </tr>
            </thead>
            <tbody>
              {CHAMPIONS.map(row => (
                <tr key={row.year}>
                  <td>{row.year}</td>
                  <td><ChampCell entry={row.club} /></td>
                  <td><ChampCell entry={row.mem} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
