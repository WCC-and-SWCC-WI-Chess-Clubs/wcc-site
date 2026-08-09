// src/wcc/WCCApp.jsx — Waukesha Chess Club sub-site shell
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainNav from './MainNav.jsx';
import HamburgerMenu from './HamburgerMenu.jsx';
import HomePage from './pages/HomePage.jsx';
import SchedulePage from './pages/SchedulePage.jsx';
import ChampionsPage from './pages/ChampionsPage.jsx';
import TournamentsPage from './pages/TournamentsPage.jsx';
import GamesPage from './pages/GamesPage.jsx';
import LinksPage from './pages/LinksPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

const PAGE_COMPONENTS = {
  home:        HomePage,
  schedule:    SchedulePage,
  champions:   ChampionsPage,
  tournaments: TournamentsPage,
  games:       GamesPage,
  links:       LinksPage,
  about:       AboutPage,
};

/** Derive the WCC page id from the current URL path */
function useWCCPage() {
  // WCCApp is always rendered as the element of a wildcard Route —
  // "/wcc/*" when nested in the root build, "/*" when this is its own
  // dedicated /wcc/ build. Either way the "*" param is already the
  // path within this sub-site, with no prefix to strip.
  const params = useParams();
  const segment = (params['*'] || '').split('/')[0] || 'home';
  return Object.keys(PAGE_COMPONENTS).includes(segment) ? segment : 'home';
}

export default function WCCApp() {
  const navigate = useNavigate();
  const params = useParams();
  const currentPage = useWCCPage();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 860);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 860);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onNavigate = (pageId) => {
    // Plain relative navigation (e.g. navigate('champions')) resolves
    // against the FULL current pathname, not this sub-site's base —
    // React Router only anchors relative navigation to a stable base
    // when it crosses a nested <Route> boundary, and WCCApp renders
    // pages directly without one. That meant clicking a nav item while
    // already on a sub-page (e.g. "/wcc/schedule") appended the new
    // page onto the current URL ("/wcc/schedule/champions") instead of
    // replacing it — the URL changed but the still-matching "schedule"
    // segment kept the same page on screen. Climb back up out of
    // however many segments deep we currently are before descending
    // into the target page, so this works from any depth/either
    // deployment (nested "/wcc/*" or dedicated "/*").
    //
    // IMPORTANT: this must be paired with { relative: 'path' }. With
    // the default relative:"route" mode, React Router treats a leading
    // ".." as "pop to an ancestor *Route match*", not "pop a URL
    // segment" — and since WCCApp itself is a single, un-nested route
    // match, there's no ancestor to pop to, so it fell all the way back
    // to the site root ("/dvds" instead of "/wcc/dvds"). relative:'path'
    // makes ".." do plain string-based segment popping against the
    // current URL instead, which is what we actually want here.
    const depth = (params['*'] || '').split('/').filter(Boolean).length;
    const up = '../'.repeat(depth);
    navigate(pageId === 'home' ? (up || '.') : `${up}${pageId}`, { relative: 'path' });
    window.scrollTo(0, 0);
  };

  const PageComponent = PAGE_COMPONENTS[currentPage] ?? HomePage;

  return (
    <>
      <MainNav
        currentPage={currentPage}
        onNavigate={onNavigate}
        mobileSlot={
          isMobile
            ? <HamburgerMenu currentPage={currentPage} onNavigate={onNavigate} />
            : null
        }
      />
      <main>
        <PageComponent onNavigate={onNavigate} />
      </main>
    </>
  );
}
