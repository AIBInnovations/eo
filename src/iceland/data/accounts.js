/**
 * Payment structure for the retreat, exactly as issued by EO Punjab.
 * The advance is paid to EO Punjab; every tranche after it is invoiced by the travel agent,
 * with GST and TCS charged extra as applicable.
 */
export const paymentColumns = ['Travelling without kids', 'Travelling with 1 kid', 'Travelling with 2 kids'];
/** Short forms used on phones, where the three amounts sit side by side. */
export const paymentColumnsShort = ['No kids', '1 kid', '2 kids'];

export const paymentRows = [
  {
    label: 'Advance',
    sub: 'Paid to EO Punjab',
    date: '29 Jul 2026',
    amounts: ['₹2,00,000', '₹2,00,000', '₹2,00,000'],
  },
  {
    label: 'Tranche 1',
    sub: 'Travel agent will raise the invoice · GST & TCS extra, as applicable',
    date: '12 Aug 2026',
    amounts: ['₹1,00,000', '₹2,00,000', '₹2,00,000'],
  },
  {
    label: 'Tranche 2',
    sub: 'Travel agent will raise the invoice · GST & TCS extra, as applicable',
    date: '30 Nov 2026',
    amounts: ['₹3,20,000', '₹4,70,000', '₹6,20,000'],
  },
  {
    label: 'Tranche 3',
    sub: 'Travel agent will raise the invoice · GST & TCS extra, as applicable. The balance is calculated on your travel preference, family combination, additional requests and upgrades.',
    date: '05 Feb 2026',
    amounts: ['Balance amount', 'Balance amount', 'Balance amount'],
  },
  {
    label: 'EO Punjab refunds the advance deposit',
    sub: 'Returned to you once the tranches are settled',
    date: '15 Feb 2026',
    amounts: ['− ₹2,00,000', '− ₹2,00,000', '− ₹2,00,000'],
    refund: true,
  },
];

export const accountsNotes = [
  'The advance of ₹2,00,000 is paid to EO Punjab and is refunded to you after the final tranche is settled.',
  'Tranches 1 to 3 are invoiced by the travel agent. GST and TCS are charged extra, as applicable.',
  'Tranche 3 is the balance, calculated on your travel preference, your family combination, and any additional requests or upgrades you have confirmed.',
  'Amounts shown are per member and per family combination. Room upgrades, extra nights and extensions are billed separately.',
];

/** How a member gets hold of their own paperwork today. */
export const accountsActions = [
  {
    title: 'Your invoices',
    text: 'Tranche invoices are raised by the travel agent in your name. Ask the accounts desk and the invoice is e-mailed to you the same working day.',
    cta: 'Request an invoice',
    subject: 'Accounts · Invoice request',
  },
  {
    title: 'Your payment status',
    text: 'Ask for a statement of what has been received against your name and what is still due, including GST and TCS.',
    cta: 'Request a statement',
    subject: 'Accounts · Payment status',
  },
  {
    title: 'A payment question',
    text: 'Anything else: a change in your family combination, an upgrade you have added, a correction on an invoice, or the refund of your advance.',
    cta: 'Ask the accounts desk',
    subject: 'Accounts · Payment question',
  },
];
