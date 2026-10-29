'use server';

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import AboutUs from '@/src/components/screens/art-house/about';

import { Locale } from '@/src/locales';

import { SITE_META_QUERY } from '@/sanity/services/art-house-service';

import { getAboutDetails, getContacts } from '@/src/utils/data/art-house';
import { buildSectionPageMetadata } from '@/src/utils/page-metadata';

import 'swiper/css';
import 'swiper/css/navigation';


interface Props {
  params: {
    locale: string;
  }
};

export default async function Page({
  params: { locale }
}: Readonly<Props>) {
  const [data, socialData] = await Promise.all([
    getAboutDetails(locale),
    getContacts(locale),
  ]);

  if (!data) {
    notFound()
  };

  return (<AboutUs data={data} socialData={socialData} />);
};


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return buildSectionPageMetadata({
    query: SITE_META_QUERY,
    locale,
    index: 1,
    path: `/${locale}/about`,
    navigationKey: 'about',
  });
};