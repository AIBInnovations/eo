import React, { forwardRef } from 'react';
import { smallOf } from '../data/images-sm.js';

/** Responsive photograph: serves the 800 px variant to phones and small slots, the 1600 px one elsewhere. */
const Pic = forwardRef(function Pic({ src, alt = '', sizes = '100vw', loading = 'lazy', ...rest }, ref) {
  const sm = smallOf(src);
  return <img ref={ref} src={src} srcSet={sm ? `${sm} 800w, ${src} 1600w` : undefined} sizes={sm ? sizes : undefined} alt={alt} loading={loading} decoding="async" {...rest} />;
});
export default Pic;
