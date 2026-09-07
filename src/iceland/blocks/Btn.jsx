import React from 'react';
import { Link } from '../router.jsx';

/**
 * The reference site's `.button_base` (cream) / `.button_base.black` (navy) button, wrapped in the
 * `.desktop_base.spec_mobile` holder the partnership page uses. Renders a Link, an external link or a button.
 */
export default function Btn({ to, href, onClick, dark = false, children, className = '', bare = false }) {
  const cls = `button_base${dark ? ' black' : ''} w-inline-block ${className}`.trim();
  let el;
  if (to) {
    el = (
      <Link to={to} className={cls}>
        <div>{children}</div>
      </Link>
    );
  } else if (href) {
    el = (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        <div>{children}</div>
      </a>
    );
  } else {
    el = (
      <button type="button" className={`${cls} ice-btn-reset`} onClick={onClick}>
        <div>{children}</div>
      </button>
    );
  }
  if (bare) return el;
  return <div className="desktop_base spec_mobile">{el}</div>;
}
