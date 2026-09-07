import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const EnquiryContext = createContext(null);

/**
 * Shared state for the enquiry panel (the glass panel under the "EO IN ICELAND" pill).
 * `openPanel(subject)` pre-fills what the enquiry is about (an activity, an add-on, an extension…).
 */
export function EnquiryProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const openPanel = useCallback((s) => {
    if (typeof s === 'string') setSubject(s);
    setOpen(true);
  }, []);
  const closePanel = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ open, toggle, openPanel, closePanel, subject, setSubject }), [open, toggle, openPanel, closePanel, subject]);
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used inside EnquiryProvider');
  return ctx;
}
