/**
 * Forwards website form submissions to a Slide Automation's webhook trigger (SLIDE_CONTACT_WEBHOOK_URL,
 * set server-side in Vercel), whose "update contact" step writes into Slide's unified Contacts CRM.
 *
 * Deliberately NOT using Slide's REST API (POST /v1/email/contacts, scope email:contacts:write):
 * that endpoint only writes to a separate "Email Contacts" marketing audience, not the Contacts hub
 * shown in the dashboard — confirmed by creating a real contact there and finding it absent from
 * Contacts (0 total) but present via GET /v1/email/contacts.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.SLIDE_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('SLIDE_CONTACT_WEBHOOK_URL is not configured');
    return res.status(500).json({ error: 'Contact sync is not configured' });
  }

  const body = req.body || {};
  const email = clean(body.email, 256);
  const phone = clean(body.phone, 32);
  if (!email && !phone) return res.status(400).json({ error: 'An email or phone number is required' });
  if (email && !EMAIL_RE.test(email)) return res.status(400).json({ error: 'Invalid email address' });

  const payload = {
    source: clean(body.source, 120) || 'Website form',
    email: email || undefined,
    firstName: clean(body.firstName, 120) || undefined,
    lastName: clean(body.lastName, 120) || undefined,
    phone: phone || undefined,
    notes: clean(body.notes, 2000) || undefined,
    pageUrl: clean(body.pageUrl, 512) || undefined,
    submittedAt: new Date().toISOString(),
  };

  try {
    const r = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      console.error('Slide webhook rejected the contact', r.status, await r.text().catch(() => ''));
      return res.status(502).json({ error: 'Could not reach the CRM' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Slide webhook request failed', err);
    return res.status(502).json({ error: 'Could not reach the CRM' });
  }
}
