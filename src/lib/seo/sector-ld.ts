import type { Sector } from '../../data/sectors';

/** Extrae dígitos de precios tipo «600€», «1.200€», «1000€». */
export function parseOfferPriceNumeric(price: string): string {
  const digits = price.replace(/\./g, '').replace(/[^\d]/g, '');
  return digits || '600';
}

function serviceNameFromSeoTitle(seoTitle: string): string {
  return seoTitle.replace(/\s*·\s*RimoByte\s*$/i, '').trim();
}

export function buildSectorLdGraph(sector: Sector, site?: URL) {
  const base = site ?? new URL('https://rimobyte.com');
  const sectorUrl = new URL(`/${sector.slug}/`, base).href;
  const minPrice = sector.offer
    ? parseOfferPriceNumeric(sector.offer.price)
    : '600';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: sector.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      {
        '@type': 'Service',
        name: serviceNameFromSeoTitle(sector.seo.title),
        provider: { '@type': 'Person', name: 'Flor Rímolo', url: 'https://rimobyte.com/' },
        areaServed: { '@type': 'Country', name: 'España' },
        description: sector.seo.description,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          price: minPrice,
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice,
            priceCurrency: 'EUR',
          },
        },
        url: sectorUrl,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: new URL('/', base).href,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Servicios',
            item: new URL('/servicios/', base).href,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: sector.name,
            item: sectorUrl,
          },
        ],
      },
    ],
  };
}
