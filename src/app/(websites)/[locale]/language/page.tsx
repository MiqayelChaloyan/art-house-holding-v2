'use server'

import { notFound } from 'next/navigation';
import Home from '@/src/components/screens/language/home';
import { getPartners } from '@/src/utils/data';
import { getDiscounts, getHomeDetails } from '@/src/utils/data/language';


interface RootProps {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}:
    Readonly<RootProps>) {
    const [data, discounts, partners] = await Promise.all([
        getHomeDetails(locale),
        getDiscounts(locale),
        getPartners(locale),
    ]);

    if (!data || !discounts || !partners) {
        notFound()
    }

    return (
        <Home
            data={data}
            discounts={discounts}
            partners={partners}
            locale={locale}
        />
    )
};

