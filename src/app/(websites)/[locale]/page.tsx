'use server';

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Home from '@/src/components/screens/art-house/home';
import JsonLd from '@/src/components/seo/JsonLd';

import { Locale } from '@/src/locales';
import { buildSiteSchema } from '@/src/utils/structured-data';

import { SITE_META_QUERY } from '@/sanity/services/art-house-service';

import { getPartners } from '@/src/utils/data';
import { getContacts, getHomeDetails } from '@/src/utils/data/art-house';
import { buildSiteMetadata, fetchSiteMetaEntry } from '@/src/utils/site-meta';


interface RootProps {
  params: {
    locale: string;
  }
};

export default async function Page({
  params: { locale }
}: Readonly<RootProps>) {
  const [partners, data, socialData] = await Promise.all([
    getPartners(locale),
    getHomeDetails(locale),
    getContacts(locale),
  ]);

  if (!data || !partners) {
    notFound()
  };

  return (
    <>
      <JsonLd
        data={buildSiteSchema({
          locale,
          address: socialData?.address,
          phoneNumbers: socialData?.phone_numbers,
          socialLinks: socialData?.social_links,
        })}
      />
      <Home data={data} partners={partners} socialData={socialData} />
    </>
  );
};


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const meta = await fetchSiteMetaEntry(SITE_META_QUERY, locale, 1);
  return buildSiteMetadata(meta, locale, `/${locale}`);
};














