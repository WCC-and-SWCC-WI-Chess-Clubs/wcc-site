// src/wcc/MainNav.jsx — Waukesha Chess Club navigation (adapted for unified project)
import { NAV_LINKS, BLOG_URL } from './data/index.js';

export default function MainNav({ currentPage, onNavigate, mobileSlot }) {

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: 'rgba(245,240,232,0.97)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* Row 1: logo + back-to-hub + optional hamburger */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.75rem 2.5rem',
        borderBottom: '1px solid rgba(200,148,26,0.12)',
      }}>
        <button
          onClick={() => onNavigate('home')}
          style={{
            fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dark)',
          }}
        >
          ♞ Waukesha Chess Club
        </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              {mobileSlot}
            </div>
      </div>

      {/* Row 2: page links (hidden on mobile via CSS) */}
      <ul className="desktop-nav-links" style={{
        display: 'flex', listStyle: 'none',
        padding: '0 2.5rem', overflowX: 'auto',
        scrollbarWidth: 'none', msOverflowStyle: 'none',
      }}>
        {NAV_LINKS.map(link => (
          <li key={link.id} style={{ flexShrink: 0 }}>
            {link.external ? (
              <a
                href={link.external} target="_blank" rel="noreferrer"
                style={{
                  display: 'block', padding: '0.65rem 0.9rem',
                  textDecoration: 'none', color: 'var(--dark)',
                  fontSize: '0.76rem', fontWeight: 500,
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  whiteSpace: 'nowrap', borderBottom: '2px solid transparent',
                }}
              >
                {link.label}
              </a>
            ) : (
              <button
                onClick={() => onNavigate(link.id)}
                style={{
                  display: 'block', padding: '0.65rem 0.9rem',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: currentPage === link.id ? 'var(--gold)' : 'var(--dark)',
                  fontSize: '0.76rem', fontWeight: 500,
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  borderBottom: currentPage === link.id
                    ? '2px solid var(--gold)'
                    : '2px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {link.label}
              </button>
            )}
          </li>
        ))}
          <li key="blog" style={{ flexShrink: 0 }}>
            <a
              href={BLOG_URL} target="_blank" rel="noreferrer"
              style={{
                display: 'block', padding: '0.65rem 0.9rem',
                textDecoration: 'none', color: 'var(--dark)',
                fontSize: '0.76rem', fontWeight: 500,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                whiteSpace: 'nowrap', borderBottom: '2px solid transparent',
              }}
            >
              WCC Blog ↗
            </a>
          </li>
      </ul>
    </header>
  );
}
