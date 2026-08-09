// src/App.jsx — Waukesha Chess Club (standalone deploy, root of its own webserver)
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import WCCApp from './wcc/WCCApp.jsx';

// This repo builds and deploys ONLY the WCC site, at the root of its own
// webserver (vite build --base=/). WCCApp reads its page from the "*"
// splat param, so it's always rendered under a wildcard Route.
function BodyTheme() {
  useEffect(() => {
    document.body.className = 'wcc-body';
    document.body.style.background = 'var(--cream)';
    document.body.style.color = 'var(--dark)';
  }, []);
  return null;
}

export default function App() {
  return (
    <>
      <BodyTheme />
      <Routes>
        <Route path="/*" element={<WCCApp />} />
      </Routes>
    </>
  );
}
