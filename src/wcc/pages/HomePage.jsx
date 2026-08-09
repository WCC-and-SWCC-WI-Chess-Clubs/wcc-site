// src/wcc/pages/HomePage.jsx
import SiteFooter from '../SiteFooter.jsx';
import wood4 from '../images/wood4.png';

export default function HomePage({ onNavigate }) {
  return (
    <div className="page-shell">
      {/* Hero */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow">Waukesha, Wisconsin · Eagles Club #453</p>
          <h1 className="hero-title">
            Where Every Move <em>Matters.</em>
          </h1>
          <p className="hero-subtitle">
            The Waukesha Chess Club welcomes players of all skill levels every Wednesday night.
            Come for the chess, stay for the community.
          </p>
          <div className="hero-badges">
            <span className="badge">♟ All skill levels</span>
            <span className="badge">📅 Every Wednesday</span>
            <span className="badge">🏆 Rated tournaments</span>
          </div>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => onNavigate('about')}>
              About the Club
            </button>
            <button className="btn-outline" onClick={() => onNavigate('schedule')}>
              See Schedule
            </button>
          </div>
        </div>
        <div className="hero-right">
          <img
            src={wood4}
            alt="Chess board"
            style={{ width: 320, height: 320, objectFit: 'cover', borderRadius: 8 }}
          />
        </div>
      </section>

      {/* When & Where */}
      <div className="where-strip">
        <div className="where-inner">
          <div className="where-block">
            <p className="where-label">When We Meet</p>
            <p className="where-main">Every Wednesday Night</p>
            <div className="time-row">
              <div>
                <div className="time-val">6:00<span style={{ fontSize: '1rem' }}>pm</span></div>
                <div className="time-lbl">Doors open</div>
              </div>
              <div>
                <div className="time-val">7:00<span style={{ fontSize: '1rem' }}>pm</span></div>
                <div className="time-lbl">Games begin</div>
              </div>
            </div>
            <p className="where-detail" style={{ marginTop: '1rem' }}>
              <button
                onClick={() => onNavigate('schedule')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gold)', fontSize: '0.87rem', padding: 0 }}
              >
                View full schedule →
              </button>
            </p>
          </div>
          <div className="where-block">
            <p className="where-label">Where We Meet</p>
            <p className="where-main">Waukesha Eagles Club #453</p>
            <p className="where-detail">
              709 N Grandview Blvd · Waukesha, WI 53188<br /><br />
              <strong style={{ color: 'rgba(245,240,232,0.8)', fontWeight: 500 }}>
                ⚠ Use the Rear / South Entrance
              </strong>
            </p>
            <p className="where-detail" style={{ marginTop: '0.75rem' }}>
              <a href="https://maps.google.com/?q=709+N+Grandview+Blvd+Waukesha+WI+53188" target="_blank" rel="noreferrer">
                Get directions →
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* 2026 Champions */}
      <div className="home-champions">
        <p className="section-label">Hall of Fame</p>
        <h2 className="section-title">2026 Champions</h2>
        <div className="home-champ-grid">
          {[
            { trophy: '🏆', year: '2026', event: 'Club Champion', name: 'Evan Seghers' },
            { trophy: '🥇', year: '2026', event: 'Waukesha Memorial Champion', name: 'Trevor Magness' },
          ].map(c => (
            <div key={c.event} className="champion-card" onClick={() => onNavigate('champions')}>
              <span style={{ fontSize: '1.2rem', marginBottom: '0.7rem', display: 'block' }}>{c.trophy}</span>
              <p className="champ-year">{c.year}</p>
              <p className="champ-event">{c.event}</p>
              <p className="champ-name">{c.name}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '1.5rem' }}>
          <button
            onClick={() => onNavigate('champions')}
            className="text-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            View full champions history (1967–2026) →
          </button>
        </p>
      </div>

      {/* Membership */}
      <div className="home-membership">
        <p className="section-label">Membership</p>
        <h2 className="section-title">Join the Club</h2>
        <p className="section-subtitle">
          Dues are kept low so the game stays accessible to everyone. Fees collected in January cover the cost of our space at the Eagles Club.
        </p>
        <div className="mem-grid">
          <div className="mem-card">
            <div className="mem-card-title">
              📅 Annual Membership{' '}
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>
                (January)
              </span>
            </div>
            <div className="mem-row"><span className="mem-who">Adult</span><span className="mem-price">$20</span></div>
            <div className="mem-row">
              <span className="mem-who">Junior <span style={{ fontSize: '0.74rem' }}>(under 18)</span></span>
              <span className="mem-price">$10</span>
            </div>
            <p className="mem-note">Best value for regular attendees. Paid once per year in January.</p>
          </div>
          <div className="mem-card">
            <div className="mem-card-title">🚪 Drop-In / Per Visit</div>
            <div className="mem-row"><span className="mem-who">Adult</span><span className="mem-price">$2</span></div>
            <div className="mem-row">
              <span className="mem-who">Junior <span style={{ fontSize: '0.74rem' }}>(under 18)</span></span>
              <span className="mem-price">$1</span>
            </div>
            <p className="mem-note">Perfect for first-timers. Just show up and pay at the door.</p>
          </div>
        </div>
      </div>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
