import React, { useEffect, useState } from 'react';
import { Link } from '../router.jsx';

const KEY = 'ice-consent';
export const readConsent = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

/** Small consent bar; analytics only loads after "Accept" (see IcelandApp). */
export default function CookieBanner({ onChange }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(!readConsent()), 1800);
    return () => clearTimeout(t);
  }, []);
  if (!shown) return null;
  const choose = (v) => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* private mode */
    }
    setShown(false);
    onChange(v);
  };
  return (
    <div className="ice-cookie" role="dialog" aria-live="polite" aria-label="Cookie notice">
      <p className="ice-cookie-txt">
        We use privacy-friendly analytics to see which pages help members most. No advertising, no tracking across sites.{' '}
        <Link to="/privacy" className="ice-cookie-link">
          Privacy policy
        </Link>
      </p>
      <div className="ice-cookie-actions">
        <button type="button" className="ice-cookie-btn is-primary" onClick={() => choose('accepted')}>
          Accept
        </button>
        <button type="button" className="ice-cookie-btn" onClick={() => choose('declined')}>
          Decline
        </button>
      </div>
    </div>
  );
}
