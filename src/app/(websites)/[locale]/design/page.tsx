'use server'

import Home from '@/src/components/screens/design/home';

import { notFound } from 'next/navigation';

import { getBlogPosts, getHomeDetails } from '@/src/utils/data/design';


interface RootProps {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}:
    Readonly<RootProps>) {
    const [data, posts] = await Promise.all([
        getHomeDetails(locale),
        getBlogPosts(locale),
    ]);

    if (!data) {
        notFound()
    }

    return (<Home data={data} posts={posts} />);
};

