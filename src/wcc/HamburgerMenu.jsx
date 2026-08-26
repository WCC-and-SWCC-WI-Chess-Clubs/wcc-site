// src/wcc/HamburgerMenu.jsx — WCC mobile hamburger menu
import { useState } from 'react';
import { NAV_LINKS, BLOG_URL } from './data/index.js';

export default function HamburgerMenu({ currentPage, onNavigate }) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(o => !o);
  const close = () => setOpen(false);

  const handleNavigate = (id) => {
    onNavigate(id);
    close();
  };

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={toggle}
        aria-label={open ? 'Close menu' : 'Open menu'}
        style={{
          display: 'flex', flexDirection: 'column', gap: 5,
          background: 'none', border: 'none', cursor: 'pointer', padding: 4,
        }}
      >
        <span style={{
          display: 'block', width: 22, height: 2,
          background: 'var(--dark)', transition: 'all 0.25s', transformOrigin: 'center',
          transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
        }} />
        <span style={{
          display: 'block', width: 22, height: 2,
          background: 'var(--dark)', transition: 'all 0.25s',
          opacity: open ? 0 : 1,
        }} />
        <span style={{
          display: 'block', width: 22, height: 2,
          background: 'var(--dark)', transition: 'all 0.25s', transformOrigin: 'center',
          transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
        }} />
      </button>

      {/* Backdrop overlay */}
      {open && (
        <div
          onClick={close}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 250,
          }}
        />
      )}

      {/* Slide-out drawer */}
      <nav
        aria-hidden={!open}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: 280,
          background: 'var(--dark)', zIndex: 300,
          padding: '5rem 2rem 2rem',
          display: 'flex', flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close menu"
          style={{
            position: 'absolute', top: '1.25rem', right: '1.5rem',
            background: 'none', border: 'none',
            color: 'rgba(245,240,232,0.6)', fontSize: '1.5rem', cursor: 'pointer',
          }}
        >
          ✕
        </button>

        {/* Nav links */}
        {NAV_LINKS.map((link) => (
          link.external ? (
            <a
              key={link.id}
              href={link.external} target="_blank" rel="noreferrer"
              onClick={close}
              style={{
                display: 'block', padding: '0.9rem 0',
                textDecoration: 'none',
                color: 'rgba(245,240,232,0.85)',
                fontSize: '1rem', fontWeight: 500,
                borderBottom: '1px solid rgba(200,148,26,0.15)',
              }}
            >
              {link.label} ↗
            </a>
          ) : (
            <button
              key={link.id}
              onClick={() => handleNavigate(link.id)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '0.9rem 0', background: 'none', border: 'none',
                cursor: 'pointer',
                color: currentPage === link.id ? 'var(--gold)' : 'rgba(245,240,232,0.85)',
                fontSize: '1rem', fontWeight: 500,
                borderBottom: '1px solid rgba(200,148,26,0.15)',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {link.label}
            </button>
          )
        ))}

        {/* Blog link */}
        {/*<a*/}
        {/*  href={BLOG_URL} target="_blank" rel="noreferrer"*/}
        {/*  onClick={close}*/}
        {/*  style={{*/}
        {/*    display: 'block', marginTop: '0.5rem', padding: '0.9rem 0',*/}
        {/*    textDecoration: 'none', color: 'var(--gold)',*/}
        {/*    fontSize: '1rem', fontWeight: 500,*/}
        {/*    borderBottom: '1px solid rgba(200,148,26,0.15)',*/}
        {/*  }}*/}
        {/*>*/}
        {/*  WCC Blog ↗*/}
        {/*</a>*/}

      </nav>
    </>
  );
}
