'use server'

import { notFound } from 'next/navigation';
import QuizPage from '@/src/components/screens/language/quiz/[quiz]';
import { getQuizBySlug } from '@/src/utils/data/language';


interface Props {
    params: {
        locale: string;
        slug: string;
    };
};

export default async function Page({
    params: { locale, slug }
}: Readonly<Props>) {
    const data = await getQuizBySlug(locale, slug[0]);

    if (!data) {
        notFound()
    }

    return (<QuizPage data={data} />);
};