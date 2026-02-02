'use client';

import { Metadata } from 'next';

interface MetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'website' | 'article';
  author?: string;
  keywords?: string[];
}

/**
 * Generate comprehensive metadata for pages
 * Use in page.tsx alongside the metadata export
 */
export function generatePageMetadata(props: MetaTagsProps): Metadata {
  const {
    title,
    description,
    image = 'https://adrs-design.com/og-image.png',
    url,
    type = 'website',
    author = 'AD.RS Design Studio',
    keywords = [],
  } = props;

  return {
    title,
    description,
    keywords,
    authors: [{ name: author }],
    creator: author,
    openGraph: {
      type: type as any,
      url,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_IN',
      siteName: 'AD.RS Design Studio',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@adrsdesign',
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

/**
 * Component for rendering structured data as JSON-LD
 */
export function SchemaScript({
  schema,
}: {
  schema: Record<string, any>;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

/**
 * Component for rendering multiple schema scripts
 */
export function SchemaScripts({
  schemas,
}: {
  schemas: Record<string, any>[];
}) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}

/**
 * Generate canonical URL tag
 */
export function canonicalUrl(url: string) {
  return url.endsWith('/') ? url : `${url}/`;
}

/**
 * Generate alternate hreflang tags
 */
export function generateAlternateLinks(baseUrl: string, locales: string[] = ['en', 'en-IN']) {
  return locales.map((locale) => ({
    rel: 'alternate',
    hrefLang: locale,
    href: `${baseUrl}`,
  }));
}
