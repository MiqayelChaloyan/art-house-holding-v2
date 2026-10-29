import type { Graph, Person, WebPage } from 'schema-dts';

type GenerateStructuredDataParams = {
  personName: string;
  qualifications: string;
  websiteUrl: string;
  locale: string;
  baseUrls: { url: string; name: string; description: string }[];
};

const generateStructuredData = ({
  personName,
  qualifications,
  websiteUrl,
  locale,
  baseUrls,
}: GenerateStructuredDataParams): Graph => {
  const personId = `${websiteUrl}#${personName.replace(/\s+/g, '-').toLowerCase()}`;

  const home: Person = {
    '@type': 'Person',
    '@id': personId,
    name: baseUrls[0].name,
    hasOccupation: {
      '@type': 'Occupation',
      qualifications: qualifications,
    },
    description: baseUrls[0].description,
    mainEntityOfPage: { '@id': websiteUrl },
    subjectOf: { '@id': websiteUrl },
  };

  const webPages: WebPage[] = baseUrls?.map((baseUrl) => ({
    '@type': 'WebPage',
    '@id': `${websiteUrl}${baseUrl.url}`,
    url: `${websiteUrl}${baseUrl.url}`,
    name: baseUrl.name,
    description: baseUrl.description,
    inLanguage: locale,
    isPartOf: {
      '@id': `${websiteUrl}#site`,
    },
    about: { '@id': personId },
    mainEntity: { '@id': personId },
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [home, ...webPages],
  };
};

export { generateStructuredData };
