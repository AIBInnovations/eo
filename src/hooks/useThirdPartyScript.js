import { useEffect } from 'react';

/**
 * Appends a third-party <script> (Travelpayouts widgets) next to `hostRef` — or into <head> —
 * and removes it on unmount. Widget markup lives in shadow DOM so its CSS cannot leak.
 */
export default function useThirdPartyScript(hostRef, { src, type, charset = 'utf-8', enabled = true, inHead = false } = {}) {
  useEffect(() => {
    if (!enabled || !src) return undefined;
    const host = inHead ? document.head : hostRef?.current;
    if (!host) return undefined;
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    if (type) script.type = type;
    if (charset) script.charset = charset;
    host.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [hostRef, src, type, charset, enabled, inHead]);
}
