// src/wcc/SiteFooter.jsx — Waukesha Chess Club footer
import { NAV_LINKS, BLOG_URL } from './data/index.js';

export default function SiteFooter({ onNavigate }) {
  return (
    <footer className="site-footer">
      <strong>Waukesha Chess Club</strong><br />
      Waukesha Eagles Club #453 · 709 N Grandview Blvd · Waukesha, WI 53188<br />
      Wednesday nights · Doors 6:00pm · Games 7:00pm · <strong>Rear/South Entrance</strong>
      <div className="footer-links">
        {NAV_LINKS.map((link, i) => (
          <span key={link.id}>
            {i > 0 && <span style={{ opacity: 0.4 }}> · </span>}
            {link.external ? (
              <a href={link.external} target="_blank" rel="noreferrer">{link.label} ↗</a>
            ) : (
              <a onClick={() => onNavigate(link.id)} style={{ cursor: 'pointer' }}>{link.label}</a>
            )}
          </span>
        ))}
        <span>
          <span style={{ opacity: 0.4 }}> · </span>
          <a href={BLOG_URL} target="_blank" rel="noreferrer">WCC Blog ↗</a>
        </span>
        <span>
          <span style={{ opacity: 0.4 }}> · </span>
          <a href="/" style={{ color: 'rgba(245,240,232,0.3)', textDecoration: 'none' }}>
            ChessMKE.org
          </a>
        </span>
      </div>
    </footer>
  );
}
