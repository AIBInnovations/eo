import React from 'react';

/**
 * Iceland Essentials — the thirteen things every traveller should carry, drawn as flat colour
 * lineart rather than set in an icon font. Each garment is a 64×64 illustration built from simple
 * shapes so it stays crisp at any size and keeps the retreat's palette (cream, navy, gold) with a
 * handful of warm and cold accents borrowed from Icelandic knitwear.
 */

const S = ({ children, tone }) => (
  <svg viewBox="0 0 64 64" className="ice-gm-svg" role="img" aria-hidden="true" style={{ '--tone': tone }}>
    {children}
  </svg>
);

/* shared drawing attributes: a flat fill with a darker outline of the same family */
const line = { fill: 'none', stroke: 'var(--gm-ink)', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
const solid = { fill: 'var(--tone)', stroke: 'var(--gm-ink)', strokeWidth: 2, strokeLinejoin: 'round' };

const Thermals = () => (
  <S tone="#7fb7d8">
    <path {...solid} d="M22 14h20l8 6-4 6-4-2v26H22V24l-4 2-4-6z" />
    <path {...line} d="M26 14a6 6 0 0 0 12 0" />
    <path {...line} d="M26 32h12M26 39h12" />
  </S>
);

const Parka = () => (
  <S tone="#c9a227">
    <path {...solid} d="M20 20c0-4 5-7 12-7s12 3 12 7l7 7-5 5-2-2v22H20V30l-2 2-5-5z" />
    <path {...line} d="M32 13c-4 3-4 7 0 9 4-2 4-6 0-9z" />
    <path {...line} d="M32 22v30" />
    <circle cx="32" cy="30" r="1.4" fill="var(--gm-ink)" stroke="none" />
    <circle cx="32" cy="38" r="1.4" fill="var(--gm-ink)" stroke="none" />
  </S>
);

const Trousers = () => (
  <S tone="#3d5a80">
    <path {...solid} d="M21 12h22l2 40h-9l-4-24-4 24h-9z" />
    <path {...line} d="M21 19h22" />
    <path {...line} d="M32 19v9" />
  </S>
);

const Fleece = () => (
  <S tone="#3fbf9f">
    <path {...solid} d="M22 15h20l8 7-4 6-4-2v26H22V26l-4 2-4-6z" />
    <path {...line} d="M27 15l5 6 5-6" />
    <path {...line} d="M32 21v10" />
    <path {...line} d="M29 18h6" />
  </S>
);

const Sweater = () => (
  <S tone="#c1613c">
    <path {...solid} d="M22 15h20l9 8-5 7-4-3v25H22V27l-4 3-5-7z" />
    <path {...line} d="M26 15a6 5 0 0 0 12 0" />
    <path {...line} d="M23 34h18" />
    <path {...line} d="M26 38l3-4 3 4 3-4 3 4" />
  </S>
);

const Boots = () => (
  <S tone="#6b4b3a">
    <path {...solid} d="M24 10h11v22c0 5 3 7 8 9 3 1 4 3 4 6v3H24z" />
    <path {...line} d="M24 40h23" />
    <path {...line} d="M27 16h8M27 22h8M27 28h8" />
  </S>
);

const Socks = () => (
  <S tone="#b93f3f">
    <path {...solid} d="M22 10h12v20c0 4 2 6 6 8 3 2 4 4 4 7 0 4-4 7-8 7s-8-3-8-8V22h-6z" />
    <path {...line} d="M22 18h12" />
    <path {...line} d="M25 13h6" />
  </S>
);

const Gloves = () => (
  <S tone="#c9a227">
    <path {...solid} d="M23 22c0-6 4-10 9-10s9 4 9 10v16c0 6-4 10-9 10s-9-4-9-10z" />
    <path {...solid} d="M41 24c3 0 5 2 5 5s-2 5-5 5" />
    <path {...line} d="M25 40h14" />
  </S>
);

const Beanie = () => (
  <S tone="#3fbf9f">
    <circle cx="32" cy="13" r="3.5" {...solid} />
    <path {...solid} d="M17 40c0-11 7-19 15-19s15 8 15 19z" />
    <rect x="15" y="40" width="34" height="8" rx="3" {...solid} />
    <path {...line} d="M32 21v19" />
  </S>
);

const NeckWarmer = () => (
  <S tone="#c1613c">
    <path {...solid} d="M18 22c4-4 9-6 14-6s10 2 14 6v20c-4 4-9 6-14 6s-10-2-14-6z" />
    <path {...line} d="M18 28c4 4 9 6 14 6s10-2 14-6" />
    <path {...line} d="M18 36c4 4 9 6 14 6s10-2 14-6" />
  </S>
);

const Sunglasses = () => (
  <S tone="#7fb7d8">
    <path {...line} d="M6 26h52" />
    <path {...solid} d="M8 26h20v6a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8z" />
    <path {...solid} d="M36 26h20v6a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8z" />
    <path {...line} d="M28 29h8" />
  </S>
);

const Swimwear = () => (
  <S tone="#2f8fb8">
    <path {...solid} d="M17 18h30l3 14-5 20H36l-4-14-4 14H19l-5-20z" />
    <path {...line} d="M17 25h30" />
    <path {...line} d="M32 32v6" />
  </S>
);

const Backpack = () => (
  <S tone="#3f7d4f">
    <path {...solid} d="M18 26c0-8 6-14 14-14s14 6 14 14v24a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4z" />
    <path {...line} d="M26 20v-4a6 6 0 0 1 12 0v4" />
    <rect x="25" y="34" width="14" height="10" rx="2" {...line} />
    <path {...line} d="M18 32h28" />
  </S>
);

export const GARMENTS = { Thermals, Parka, Trousers, Fleece, Sweater, Boots, Socks, Gloves, Beanie, NeckWarmer, Sunglasses, Swimwear, Backpack };

export default function Garment({ name }) {
  const Cmp = GARMENTS[name];
  return Cmp ? <Cmp /> : null;
}
