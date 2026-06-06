/** Site Settings seed — a singleton document */

export const siteSettingsSeeds = [
  {
    _id: 'demo-settings-01',
    siteName: 'AD.RS Design Studio',
    homeHero: {
      _type: 'object',
      title: 'Quiet Spaces, Profound Feeling.',
      subtitle: 'Architecture as an emotional canvas. We design environments that breathe, listen, and hold the essence of life.',
      ctaText: 'View Our Projects',
      ctaLink: '/projects',
    },
    contactInfo: {
      _type: 'object',
      email: 'info@adrs-design.com',
      phone: '+91 755 420 0000',
      address: '14, Arera Colony, Zone-II\nBhopal, Madhya Pradesh 462016\nIndia',
      officeHours: 'Mon – Fri: 9:00 AM – 6:30 PM IST',
    },
    socialLinks: [
      { _key: 'sl-ig', _type: 'object', platform: 'instagram', url: 'https://instagram.com/adrs.design' },
      { _key: 'sl-li', _type: 'object', platform: 'linkedin',  url: 'https://linkedin.com/company/adrs-design' },
      { _key: 'sl-pi', _type: 'object', platform: 'pinterest', url: 'https://pinterest.com/adrsdesign' },
    ],
    globalSeo: {
      _type: 'object',
      title: 'AD.RS Design Studio — Architecture & Interior Design, India',
      description: 'AD.RS Design Studio crafts award-winning residential, commercial, and hospitality architecture across India. We design spaces that breathe, listen, and endure.',
      keywords: ['architecture', 'interior design', 'India', 'sustainable architecture', 'residential design', 'hospitality design', 'Bhopal architect'],
    },
  },
];
