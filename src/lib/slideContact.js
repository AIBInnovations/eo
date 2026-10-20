/**
 * Creates/updates a Slide CRM contact via the serverless proxy (/api/contact), which holds
 * the Slide automation webhook URL server-side. Never throws — returns false on any failure
 * so callers can decide how to degrade (the form flow should still complete for the visitor).
 */
export async function syncContact({ source, email, firstName, lastName, phone, notes }) {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source,
        email,
        firstName,
        lastName,
        phone,
        notes,
        pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error('Slide contact sync failed', err);
    return false;
  }
}
