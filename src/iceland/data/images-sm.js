/** Maps each full-size photograph URL to its 800 px variant (generated into assets/iceland/sm). */
const large = import.meta.glob('../../assets/iceland/*.webp', { eager: true, import: 'default' });
const small = import.meta.glob('../../assets/iceland/sm/*.webp', { eager: true, import: 'default' });
const byUrl = new Map();
for (const [key, url] of Object.entries(large)) {
  const name = key.split('/').pop();
  const sm = small[`../../assets/iceland/sm/${name}`];
  if (sm) byUrl.set(url, sm);
}
export const smallOf = (url) => byUrl.get(url) || null;
