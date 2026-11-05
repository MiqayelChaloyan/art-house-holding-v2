import { type Metadata } from 'next';

import Courses from '@/src/components/screens/design/home/Courses';

import { Locale } from '@/src/locales';
import { Pages } from '@/src/constants/pages';
import { SITE_META_QUERY } from '@/sanity/services/design-service';
import { buildSectionPageMetadata } from '@/src/utils/page-metadata';
import { getCourses, getHomeDetails } from '@/src/utils/data/design';


interface Props {
    params: {
        locale: string;
    };
};

export default async function Page({ params: { locale } }: Readonly<Props>) {
    const [courses, home] = await Promise.all([
        getCourses(locale),
        getHomeDetails(locale),
    ]);

    const cards = (courses ?? []).map((course) => ({
        ...course,
        _key: course._id,
        course_name: course.course_name || course.name,
    }));
    return (
        <Courses
            courses={cards}
            numbered
            page
            section={home?.courses_section}
        />
    );
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    return buildSectionPageMetadata({
        query: SITE_META_QUERY,
        locale,
        path: `/${locale}${Pages.DESIGN_COURSES}`,
        navigationKey: 'courses',
    });
}
