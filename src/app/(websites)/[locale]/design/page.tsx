'use server'

import Home from '@/src/components/screens/design/home';

import { notFound } from 'next/navigation';

import { getPartners } from '@/src/utils/data';
import { getHomeDetails } from '@/src/utils/data/design';


interface RootProps {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}:
    Readonly<RootProps>) {
    const [data, partners] = await Promise.all([
        getHomeDetails(locale),
        getPartners(locale),
    ]);

    if (!data || !partners) {
        notFound()
    }

    return (<Home data={data} partners={partners} />);
};

