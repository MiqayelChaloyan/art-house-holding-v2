'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import { Arial } from '@/src/constants/font';

import styles from './styles.module.sass';


interface PrivateLessonsProps {
    data: PRIVATE_LESSONS[];
};

const PrivateLessons = ({ data }: PrivateLessonsProps) => {
    const t = useTranslations();

    const tableRows: JSX.Element[] = data?.map((item: PRIVATE_LESSONS) => {
        return (
            <tr key={item._key}>
                <td>{item.teaching_language}</td>
                <td>{item.private_lessons.three_week}</td>
                <td>{item.private_lessons.two_week}</td>
            </tr>
        );
    });

    return (
        <div className={Arial.className}>
            <h1 className={styles.title}>
                {t('titles.private-lessons')}
            </h1>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th rowSpan={2} colSpan={1}>
                                {t('tables-titles.languages-taught')}
                            </th>
                            <th rowSpan={1} colSpan={2}>
                                {t('tables-titles.private-lessons')}
                            </th>
                        </tr>
                        <tr>
                            <th>{t('tables-titles.three-days-week')}</th>
                            <th>{t('tables-titles.two-days-week')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default React.memo(PrivateLessons);