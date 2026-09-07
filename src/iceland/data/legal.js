/**
 * Privacy policy and terms for the retreat microsite. Plain-language drafts for a members' site:
 * have the chapter's counsel review before launch and fill in the legal entity / address.
 */
export const legalEntity = {
  name: 'EO Punjab Chapter',
  address: 'Chandigarh, Punjab, India', // TODO: replace with the chapter's registered address
  email: 'Contact the retreat chairs on the members’ WhatsApp group',
};

export const privacy = {
  title: 'Privacy Policy',
  updated: '7 September 2026',
  intro: 'This website exists for one purpose: to help EO Punjab members and their families plan the Iceland 2027 retreat. Here is what we collect, why, and what we do not do.',
  sections: [
    {
      h: 'What we collect',
      p: [
        'Enquiry form: your name, mobile number, e-mail (optional), the topic and your message. We use it only to answer you and to arrange what you asked for (flights, rooms, breakouts, extensions).',
        'Analytics: with your consent we use Vercel Web Analytics, which counts page views without cookies and without identifying you. Declining changes nothing about how the site works.',
        'Downloads: opening a PDF is served directly from our hosting provider; we do not track who downloads what.',
      ],
    },
    {
      h: 'How we use it',
      p: [
        'Your enquiry goes to the retreat desk (the retreat chairs and the appointed travel agent). Flight and passport details you share are passed to the travel agent and the hotel only to make bookings and transfers.',
        'We do not sell, rent or share your information with anyone else, and we do not use it for marketing.',
      ],
    },
    {
      h: 'Retention',
      p: ['Enquiries and travel details are kept until the retreat has ended and every booking has been settled, then deleted within 90 days unless you ask us to keep them.'],
    },
    {
      h: 'Your choices',
      p: ['Ask the retreat desk at any time to see, correct or delete what we hold about you. You can withdraw analytics consent by clearing this site’s data in your browser; the banner will ask again.'],
    },
    {
      h: 'Hosting',
      p: ['The site is hosted on Vercel. Their infrastructure may log requests (IP address, browser) for security for a short period, as any web host does.'],
    },
  ],
};

export const terms = {
  title: 'Terms of Use',
  updated: '7 September 2026',
  intro: 'These terms cover the use of this website. The retreat itself (payments, cancellations, what is included) is governed by the retreat brief and the confirmations issued by the retreat desk.',
  sections: [
    {
      h: 'Members’ site',
      p: ['Content on this site is prepared for EO Punjab members and their families. Please do not redistribute the itinerary, documents or photographs outside the chapter.'],
    },
    {
      h: 'Information',
      p: [
        'Timings, venues and activities are planned in good faith and can change with weather, safety advice or availability, especially glacier and water activities. The final word is always the latest announcement from the retreat desk.',
        'Countdown, dates and prices shown are indicative. Confirmations you receive from the retreat desk prevail.',
      ],
    },
    {
      h: 'Activities and risk',
      p: ['Day 4 breakouts and the glacier day carry age, health and clothing requirements listed on the site. Participation is at your own discretion; please read the requirements and carry adequate travel and adventure insurance.'],
    },
    {
      h: 'Photography',
      p: ['Landscape photographs are used under Creative Commons licences with attribution kept in the site’s source. The EO Punjab poster and brief are the property of EO Punjab.'],
    },
    {
      h: 'Contact',
      p: ['Questions about these terms go to the retreat chairs through the enquiry form.'],
    },
  ],
};
