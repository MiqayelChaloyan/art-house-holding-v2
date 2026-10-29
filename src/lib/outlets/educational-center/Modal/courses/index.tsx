'use client'

import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { notFound, useParams } from 'next/navigation';

import { useDispatch } from 'react-redux';
import { closeModal } from '@/src/store/modal_reducer';

import { Pages } from '@/src/constants/pages';
import { Arial } from '@/src/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    locale: string;
    courses: COURSES_QUERYResult[];
};

const CoursesModal = ({ locale, courses }: Readonly<Props>) => {
    const params = useParams();
    const { slug } = params;

    const t = useTranslations('navigation');

    const dispatch = useDispatch();

    if (!courses) return notFound();

    const handlecloseModal = () => setTimeout(() => dispatch(closeModal(false)), 1500);

    return (
        <div className={styles.courses_container}>
            <p className={cn(styles.title, Arial.className)}>
                {t('courses')}
            </p>
            <div className={styles.list}>
                {courses?.map((course) => (
                    <Link
                        key={course._id}
                        href={`/${locale}${Pages.EDUCATIONAL_HOME}/${course.slug}`}
                        className={styles.link}
                        onClick={handlecloseModal}
                    >
                        <p className={cn(styles.course, slug && slug[0] == course?.slug ? styles['active-lessons'] : styles.lessons, Arial.className)}>
                            {course.course_name}
                        </p>
                    </Link>
                )
                )}
            </div>
        </div>
    );
};

export default React.memo(CoursesModal);
