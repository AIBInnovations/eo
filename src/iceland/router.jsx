import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getScroller } from './perf.js';

/**
 * Tiny pathname router for the retreat site: `/` (home) plus one page per section.
 * Uses the History API so URLs read like the reference site (`/journey`, `/travel-desk`, …);
 * `?page=travel` is handled before this router in App.jsx.
 */
export const ROUTES = {
  '/': 'home',
  '/journey': 'journey',
  '/adventure': 'adventure',
  '/stay': 'stay',
  '/extensions': 'extensions',
  '/enquire': 'enquire',
  '/travel-desk': 'travel-desk',
  '/family': 'family',
  '/accounts': 'accounts',
  '/updates': 'updates',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/thank-you': 'thank-you',
};

export const normalizePath = (pathname) => {
  const p = String(pathname || '/').replace(/\/+$/, '');
  return p === '' ? '/' : p;
};

const RouterContext = createContext(null);

/** Smooth-scroll to an in-page anchor through Lenis (falls back to native scrolling). */
export function scrollToHash(e, href, { offset = 0 } = {}) {
  if (!href || !href.startsWith('#')) return false;
  const target = href === '#top' ? document.body : document.querySelector(href);
  if (!target) return false;
  if (e && e.preventDefault) e.preventDefault();
  const lenis = window.__lenis;
  if (href === '#top') {
    const scroller = getScroller();
    if (lenis && lenis.scrollTo) lenis.scrollTo(0);
    else if (scroller) scroller.scrollTo({ top: 0, behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    return true;
  }
  if (lenis && lenis.scrollTo) lenis.scrollTo(target, { offset });
  else target.scrollIntoView({ behavior: 'smooth' });
  return true;
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const pendingHash = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // After every route change: jump to the top (or to the requested anchor) and let ScrollTrigger re-measure.
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const lenis = window.__lenis;
    window.scrollTo(0, 0);
    const scroller = getScroller();
    if (scroller) scroller.scrollTop = 0;
    if (lenis && lenis.scrollTo) lenis.scrollTo(0, { immediate: true });
    const hash = pendingHash.current;
    pendingHash.current = null;
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (hash) requestAnimationFrame(() => scrollToHash(null, hash));
    });
  }, [path]);

  const navigate = useCallback(
    (to, { replace = false } = {}) => {
      const [rawPath, hash] = String(to).split('#');
      const nextPath = rawPath ? normalizePath(rawPath) : path;
      if (!(nextPath in ROUTES)) {
        window.location.href = to;
        return;
      }
      if (nextPath === path) {
        if (hash) scrollToHash(null, `#${hash}`);
        else scrollToHash(null, '#top');
        return;
      }
      pendingHash.current = hash ? `#${hash}` : null;
      const url = nextPath + (hash ? `#${hash}` : '');
      if (replace) window.history.replaceState({}, '', url);
      else window.history.pushState({}, '', url);
      setPath(nextPath);
    },
    [path]
  );

  const value = useMemo(() => ({ path, page: ROUTES[path] || 'not-found', navigate }), [path, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used inside RouterProvider');
  return ctx;
}

/**
 * Anchor that routes internally. `to` may be a path (`/journey`), a path with an anchor
 * (`/#adventure`) or a bare anchor (`#journey`, scrolled on the current page).
 * External / download links (http…, /downloads/…) fall through to a normal <a>.
 */
export function Link({ to, onClick, children, ...rest }) {
  const { navigate } = useRouter();
  const internal = to && (to.startsWith('#') || normalizePath(to.split('#')[0]) in ROUTES);
  const handle = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented || !internal) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (to.startsWith('#')) {
      if (!scrollToHash(null, to)) navigate(`/${to}`);
      return;
    }
    navigate(to);
  };
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
