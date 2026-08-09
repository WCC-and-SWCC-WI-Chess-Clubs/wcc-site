// src/wcc/pages/AboutPage.jsx
import { BOARD_MEMBERS } from '../data/index.js';
import SiteFooter from '../SiteFooter.jsx';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="page-shell">
      <div className="page-hero">
        <p className="eyebrow">Waukesha Chess Club</p>
        <h1>About Us</h1>
      </div>
      <div className="page-inner">
        <div className="about-grid">

          {/* Left: prose */}
          <div>
            <div className="about-prose">
              <p>
                The Waukesha Chess Club is open to all!&nbsp;&nbsp;Beginner or expert — come out on Wednesdays
                and join us. We're a local group of chess enthusiasts working to make chess
                more accessible for everyone.
              </p>
              <p>
                We have a variety of backgrounds and abilities, from kids just learning, to adults
                playing socially, all the way to very competitive master-level players. We even have
                several coaches in our ranks if you need a little help. No matter how well you play —
                or if you're just starting — we will make you feel right at home.
              </p>
              <p>
                We are affiliated with both the{' '}
                <a href="https://new.uschess.org/" target="_blank" rel="noreferrer">US Chess Federation</a>
                {' '}and the{' '}
                <a href="https://wischess.org/" target="_blank" rel="noreferrer">Wisconsin Chess Association</a>,
                and would be happy to provide information or help you get started on your chess journey.
              </p>
              <p>
                <strong>One of the longest-running clubs in the region.</strong> Take a look at our{' '}
                <button
                  onClick={() => onNavigate('champions')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gold)', fontSize: 'inherit', padding: 0 }}
                >
                  Champions page
                </button>
                {' '}— it's a who's who of significant WI, Midwest, and frequently national figures
                in chess. Our recorded history runs over 40 years, but we have members who have been
                involved in organized chess for much longer!
              </p>
              <p>
                We typically{' '}
                <button
                  onClick={() => onNavigate('schedule')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gold)', fontSize: 'inherit', padding: 0 }}
                >
                  run events
                </button>
                {' '}lasting 4 weeks, playing one game each Wednesday, with a time control of
                100 minutes per side plus a 5-second delay per move.
              </p>
              <p>
                For those used to playing 3-minute (or faster) chess online — come try a more
                thoughtful pace. When you actually have time to think, you'll find chess stops being
                just a video game and shows its true character.
              </p>
            </div>

            <div className="contact-box">
              <h3>Membership</h3>
              <hr className="wcc-hr"/>
              <div>
                <b>Annual dues</b><br/>
                <ul>
                  <li className="wcc-indented-list">$20 per Adult</li>
                  <li className="wcc-indented-list">$10 per Junior (under 18)</li>
                </ul>
                <b>Pay per visit</b> (<i>if not paying annually</i>)<br/>
                <ul>
                  <li className="wcc-indented-list">$2 per Adult</li>
                  <li className="wcc-indented-list">$1 per Junior</li>
                </ul>
              </div>
            </div>

            <div className="contact-box">
              <p>
                Questions? Check{' '}
                <a href="https://waukeshachessclub.blogspot.com/" target="_blank" rel="noreferrer">
                  the WCC Blog
                </a>
                {' '}first — many questions are answered there. If not,{' '}
                <a href="mailto:chess@demastri.com">send us an email</a>
                {' '}and one of our TDs will get back to you.
              </p>
            </div>
          </div>

          {/* Right: board members */}
          <div>
            <div className="board-card">
              <div className="board-card-header">WCC Board Members</div>
              <table className="board-table">
                <tbody>
                  {BOARD_MEMBERS.map(m => (
                    <tr key={m.role}>
                      <td>{m.role}</td>
                      <td>{m.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
