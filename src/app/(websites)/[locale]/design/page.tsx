'use server'

import Home from '@/src/components/screens/design/home';

import { notFound } from 'next/navigation';

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
    const data = await getHomeDetails(locale);

    if (!data) {
        notFound()
    }

    return (<Home data={data} />);
};

