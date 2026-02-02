// SEO Configuration and Structured Data Helpers

export const SEO_CONFIG = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://adrs-design.com',
  siteName: 'AD.RS Design Studio',
  description: 'Premier architectural design and interior design services in Bhopal. Sustainable, innovative spaces for residences, offices, commercial venues, and hospitality.',
  twitter: '@adrsdesign',
  author: 'AD.RS Design Studio',
  locale: 'en_IN',
  
  // Business Information
  business: {
    name: 'AD.RS Design Studio',
    email: 'info@adrs-design.com',
    phone: '+91-XXXXXXXXXX',
    location: {
      city: 'Bhopal',
      state: 'MP',
      country: 'IN',
      lat: 23.1815,
      lng: 79.9864,
    },
    socials: {
      instagram: 'https://instagram.com/adrsdesign',
      facebook: 'https://facebook.com/adrsdesign',
      linkedin: 'https://linkedin.com/company/adrs-design-studio',
    },
  },

  // Keywords for different sections
  keywords: {
    home: [
      'interior design', 'architecture', 'design studio', 'interior designer',
      'architectural design', 'home design', 'sustainable design', 'Bhopal design',
      'space planning', 'eco-friendly design', 'design consulting'
    ],
    projects: [
      'design projects', 'interior design portfolio', 'residential design',
      'commercial design', 'office design', 'design gallery', 'design showcase'
    ],
    services: [
      'interior design services', 'architectural services', 'space planning',
      'design consultation', 'residential design', 'commercial design'
    ],
  },
};

// Schema.org Structured Data Generators

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.business.name,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/logo.png`,
    description: SEO_CONFIG.description,
    sameAs: Object.values(SEO_CONFIG.business.socials),
    address: {
      '@type': 'PostalAddress',
      addressLocality: SEO_CONFIG.business.location.city,
      addressRegion: SEO_CONFIG.business.location.state,
      addressCountry: SEO_CONFIG.business.location.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      telephone: SEO_CONFIG.business.phone,
      email: SEO_CONFIG.business.email,
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': SEO_CONFIG.siteUrl,
    name: SEO_CONFIG.business.name,
    image: `${SEO_CONFIG.siteUrl}/og-image.png`,
    description: SEO_CONFIG.description,
    url: SEO_CONFIG.siteUrl,
    telephone: SEO_CONFIG.business.phone,
    email: SEO_CONFIG.business.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SEO_CONFIG.business.location.city,
      addressRegion: SEO_CONFIG.business.location.state,
      addressCountry: SEO_CONFIG.business.location.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO_CONFIG.business.location.lat,
      longitude: SEO_CONFIG.business.location.lng,
    },
    areaServed: [
      SEO_CONFIG.business.location.city,
      'Central India',
    ],
    serviceType: [
      'Interior Design',
      'Architectural Design',
      'Space Planning',
      'Design Consulting',
    ],
    priceRange: '$$',
    sameAs: Object.values(SEO_CONFIG.business.socials),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProjectSchema(project: {
  name: string;
  description: string;
  image: string;
  url: string;
  category: string;
  year: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    image: project.image,
    url: project.url,
    author: {
      '@type': 'Organization',
      name: SEO_CONFIG.business.name,
    },
    datePublished: `${project.year}-01-01`,
    keywords: project.category,
  };
}

export function generateWebPageSchema(page: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: page.url,
    image: page.image || `${SEO_CONFIG.siteUrl}/og-image.png`,
    isPartOf: {
      '@type': 'WebSite',
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.business.name,
      logo: `${SEO_CONFIG.siteUrl}/logo.png`,
    },
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  image?: string;
  areaServed?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    image: service.image || `${SEO_CONFIG.siteUrl}/logo.png`,
    provider: {
      '@type': 'Organization',
      name: SEO_CONFIG.business.name,
      url: SEO_CONFIG.siteUrl,
    },
    areaServed: {
      '@type': 'City',
      name: service.areaServed || SEO_CONFIG.business.location.city,
    },
  };
}
