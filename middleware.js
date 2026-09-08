import { next } from '@vercel/edge';

/**
 * Members-only gate for the whole site (Vercel Edge Middleware, runs before every request).
 *
 * One shared credential for everyone travelling — the "official login number" and a password —
 * configured as environment variables on the Vercel project:
 *   EO_LOGIN_NUMBER    the login number members are given (digits only are compared)
 *   EO_LOGIN_PASSWORD  the password
 *   EO_SESSION_SECRET  any long random string; signs the session cookie
 * While the number or password is unset the gate stays open, so a preview never locks itself out.
 *
 * A successful login sets a signed, HttpOnly cookie for 30 days. Changing the password or the
 * number signs everyone out. /logout clears the cookie.
 */
export const config = {
  matcher: ['/((?!_vercel|brand/|favicon|apple-touch-icon|icon-|site\\.webmanifest|robots\\.txt).*)'],
};

const COOKIE = 'eo_view';
const MAX_AGE = 60 * 60 * 24 * 30;
const enc = new TextEncoder();

const digits = (v) => String(v || '').replace(/\D/g, '');

async function sign(secret, message) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('');
}

function readCookie(req, name) {
  const jar = req.headers.get('cookie') || '';
  const m = jar.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
  return m ? m[1] : null;
}

const safeNext = (v) => {
  const s = String(v || '/');
  return s.startsWith('/') && !s.startsWith('//') && s !== '/login' ? s : '/';
};

const html = (body, status = 200) =>
  new Response(body, { status, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });

const escape = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function loginPage({ error = false, next: nextPath = '/' } = {}) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Members only · Iceland 2027 · EO Punjab</title>
<meta name="robots" content="noindex">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>
  :root { --navy:#0b1f3a; --cream:#f4efe6; --gold:#c9a24a; --line:#d9d2c5; --ink:#0b1f3a; }
  * { box-sizing:border-box; }
  html,body { margin:0; height:100%; }
  body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; background: var(--navy); color: var(--cream); display:flex; align-items:center; justify-content:center; padding: 24px; min-height:100dvh; }
  .wrap { width:100%; max-width: 420px; }
  .logo { display:block; height:56px; width:auto; margin: 0 auto 28px; }
  .card { background: var(--cream); color: var(--ink); border-radius: 12px; padding: 30px 28px 28px; box-shadow: 0 30px 80px rgba(0,0,0,.35); }
  .eyebrow { font-size: 11px; letter-spacing:.24em; text-transform:uppercase; color: var(--gold); font-weight:700; margin:0 0 8px; }
  h1 { font-size: 24px; line-height:1.15; margin: 0 0 6px; font-weight: 600; }
  p.lead { margin: 0 0 22px; font-size: 14px; line-height:1.5; opacity:.8; }
  label { display:block; font-size: 11px; letter-spacing:.16em; text-transform:uppercase; font-weight:700; margin: 14px 0 6px; }
  input { width:100%; font: inherit; font-size: 16px; padding: 13px 14px 11px; border: 1px solid var(--line); border-radius: 6px; background:#fff; color: var(--ink); }
  input:focus { outline: 0; border-color: var(--ink); }
  button { width:100%; margin-top: 20px; font: inherit; font-size: 13px; letter-spacing:.2em; text-transform:uppercase; font-weight:700; padding: 16px 18px 14px; border:0; border-radius: 6px; background: var(--navy); color: var(--cream); cursor:pointer; }
  button:hover { background:#12305a; }
  .err { margin: 14px 0 0; padding: 10px 12px; border-left: 2px solid #b3261e; background: rgba(179,38,30,.08); color:#8f1d16; font-size: 13px; border-radius: 4px; }
  .foot { text-align:center; font-size: 11px; letter-spacing:.2em; text-transform:uppercase; opacity:.6; margin-top: 22px; }
</style></head>
<body><div class="wrap">
  <img class="logo" src="/brand/eo-amplify-light.png" alt="EO Punjab × Amplify">
  <form class="card" method="post" action="/login" autocomplete="on">
    <p class="eyebrow">Iceland 2027 · Members only</p>
    <h1>Land of Fire &amp; Ice.</h1>
    <p class="lead">Sign in with the login number and password shared by the retreat chairs.</p>
    <label for="number">Login number</label>
    <input id="number" name="number" type="tel" inputmode="numeric" autocomplete="username" required placeholder="Official login number">
    <label for="password">Password</label>
    <input id="password" name="password" type="password" autocomplete="current-password" required placeholder="Password">
    <input type="hidden" name="next" value="${escape(nextPath)}">
    ${error ? '<p class="err">That login number and password do not match. Check the message from the retreat chairs and try again.</p>' : ''}
    <button type="submit">View Iceland</button>
  </form>
  <p class="foot">EO Punjab × Amplify · 31 March – 4 April 2027</p>
</div></body></html>`;
}

export default async function middleware(req) {
  const url = new URL(req.url);
  const number = digits(process.env.EO_LOGIN_NUMBER);
  const password = process.env.EO_LOGIN_PASSWORD || '';
  if (!number || !password) return next(); // gate not configured yet

  const secret = process.env.EO_SESSION_SECRET || `${number}:${password}`;
  const expected = await sign(secret, `${number}:${password}`);
  const authed = readCookie(req, COOKIE) === expected;

  if (url.pathname === '/logout') {
    return new Response(null, {
      status: 303,
      headers: { location: '/', 'set-cookie': `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax` },
    });
  }

  if (url.pathname === '/login') {
    if (req.method !== 'POST') return authed ? Response.redirect(new URL('/', url), 303) : html(loginPage({ next: '/' }));
    const form = await req.formData();
    const nextPath = safeNext(form.get('next'));
    const ok = digits(form.get('number')) === number && String(form.get('password') || '') === password;
    if (!ok) return html(loginPage({ error: true, next: nextPath }), 401);
    return new Response(null, {
      status: 303,
      headers: { location: nextPath, 'set-cookie': `${COOKIE}=${expected}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax` },
    });
  }

  if (authed) return next();

  // Not signed in: show the login in place and come back to this URL afterwards.
  // HTML navigations get the page; asset requests just get refused.
  const accept = req.headers.get('accept') || '';
  if (accept.includes('text/html')) return html(loginPage({ next: url.pathname + url.search }), 401);
  return new Response('Sign in required', { status: 401, headers: { 'cache-control': 'no-store' } });
}
