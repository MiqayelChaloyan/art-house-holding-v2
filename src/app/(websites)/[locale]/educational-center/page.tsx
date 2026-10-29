'use server'

import { notFound } from 'next/navigation';

import Home from '@/src/components/screens/educational-center/home';
import { getHomeDetails } from '@/src/utils/data/educational-center';

import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


interface RootProps {
    params: {
        locale: string;
    };
};

export default async function Page({
    params: { locale }
}: Readonly<RootProps>) {
    const data = await getHomeDetails(locale);

    if (!data) {
        notFound()
    };

    return (<Home data={data} />);
};
