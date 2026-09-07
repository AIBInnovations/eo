import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { useEnquiry } from '../EnquiryContext.jsx';

export const ENQUIRY_TOPICS = ['Joining the retreat', 'Day 4 breakout activity', 'Room upgrade or extra night', 'Trip extension', 'Flights and transfers', 'Something else'];

/**
 * The enquiry form used in the glass panel (compact) and on the Enquire page (full).
 * Front-end only: shows a confirmation on submit. Wire `onSubmit` to the retreat desk later.
 */
export default function EnquiryForm({ compact = false }) {
  const { subject, setSubject } = useEnquiry();
  const [done, setDone] = useState(false);
  const [topic, setTopic] = useState(ENQUIRY_TOPICS[0]);

  useEffect(() => {
    if (subject) {
      const match = ENQUIRY_TOPICS.find((t) => subject.toLowerCase().includes(t.split(' ')[0].toLowerCase()));
      setTopic(match || 'Something else');
    }
  }, [subject]);

  const submit = (e) => {
    e.preventDefault();
    setDone(true);
  };

  if (done) {
    return (
      <div className={`ice-enquiry ice-enquiry--done${compact ? ' is-compact' : ''}`}>
        <div className="ice-enquiry-check">
          <Check size={22} strokeWidth={2.2} />
        </div>
        <h3 className="ice-enquiry-title">Thank you.</h3>
        <p className="ice-p">The retreat desk has your enquiry and will get back to you on WhatsApp or e-mail.</p>
        <button
          type="button"
          className="ice-link-btn"
          onClick={() => {
            setDone(false);
            setSubject('');
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className={`ice-enquiry${compact ? ' is-compact' : ''}`} onSubmit={submit}>
      <div className="ice-eyebrow">Enquire</div>
      <h3 className="ice-enquiry-title">{compact ? 'Ask the retreat desk.' : 'Tell us what you need.'}</h3>
      {!compact && <p className="ice-p ice-muted">Flights, rooms, breakouts, extensions or anything else about Iceland 2027. One form, one reply.</p>}
      <div className="ice-enquiry-grid">
        <label className="ice-field">
          <span>Full name</span>
          <input type="text" name="name" placeholder="Your name" required autoComplete="name" />
        </label>
        <label className="ice-field">
          <span>Mobile number</span>
          <input type="tel" name="mobile" placeholder="+91" required autoComplete="tel" />
        </label>
        <label className="ice-field">
          <span>E-mail</span>
          <input type="email" name="email" placeholder="you@example.com" autoComplete="email" />
        </label>
        <div className="ice-field ice-field--wide" role="radiogroup" aria-label="About">
          <span>About</span>
          <div className="ice-topics">
            {ENQUIRY_TOPICS.map((t) => (
              <button type="button" key={t} className={`ice-topic${topic === t ? ' is-active' : ''}`} onClick={() => setTopic(t)} role="radio" aria-checked={topic === t}>
                {t}
              </button>
            ))}
          </div>
          <input type="hidden" name="topic" value={topic} />
        </div>
        <label className="ice-field ice-field--wide">
          <span>Message</span>
          <textarea name="message" rows={compact ? 3 : 5} placeholder={subject ? `About: ${subject}` : 'How can we help?'} defaultValue={subject ? `About: ${subject}\n` : ''} />
        </label>
      </div>
      <button type="submit" className="ice-btn ice-btn--navy">
        Send enquiry
      </button>
    </form>
  );
}
