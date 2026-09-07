import React, { useEffect, useState } from 'react';

const parts = (ms) => {
  const t = Math.max(0, ms);
  return {
    days: Math.floor(t / 86400000),
    hours: Math.floor((t / 3600000) % 24),
    minutes: Math.floor((t / 60000) % 60),
    seconds: Math.floor((t / 1000) % 60),
  };
};

/** Live countdown to the moment the retreat starts (6:30 PM, 31 March 2027, Reykjavík = UTC). */
export default function Countdown({ target, label = 'Countdown to Iceland' }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const p = parts(new Date(target).getTime() - now);
  const cells = [
    ['Days', p.days],
    ['Hours', p.hours],
    ['Minutes', p.minutes],
    ['Seconds', p.seconds],
  ];
  return (
    <div className="ice-countdown color-inversion-target" aria-live="polite">
      <div className="ice-countdown-label">{label}</div>
      <div className="ice-countdown-grid">
        {cells.map(([name, value]) => (
          <div className="ice-countdown-cell" key={name}>
            <div className="ice-countdown-value">{String(value).padStart(2, '0')}</div>
            <div className="ice-countdown-unit">{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
