'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import Gallery from '@/src/components/components/gallery';
import { Arial } from '@/src/constants/font';
import { Pages } from '@/src/constants/pages';
import { Titles } from '@/src/constants';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
  courses: COURSES_DESIGN_QUERYResult[];
};

const defaultSearchParam = 'All';

const Portfolios = ({ courses }: Readonly<Props>) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const property: string | null = searchParams.get('name');
  const decodedProperty = property ? decodeURIComponent(property).replace(/_/g, ' ') : '';
  const [allCourses, _] = useState<COURSES_DESIGN_QUERYResult[]>(courses);
  const [category, setCategory] = useState<COURSES_DESIGN_QUERYResult[]>([]);

  const activeLocale = useLocale();

  useEffect(() => {
    const filteredCourses = decodedProperty && decodedProperty !== defaultSearchParam
      ? allCourses?.filter((elem: COURSES_DESIGN_QUERYResult) => elem.name === decodedProperty)
      : allCourses;
    setCategory(filteredCourses);
  }, [decodedProperty, courses, allCourses]);

  const navbar: React.JSX.Element[] = allCourses?.map(({ course_name, _id, slug, name }: COURSES_DESIGN_QUERYResult) => (
    <Link
      key={_id}
      href={`/${activeLocale}${Pages.DESIGN_PORTFOLIOS}/${encodeURIComponent(slug)}`}
      scroll={false}
      className={cn(styles.link, styles.line, decodedProperty === name ? styles.active : '', Arial.className)}
    >
      <span>{course_name}</span>
    </Link>
  ));


  return (
    <section id='portfolio' className={styles.container}>
      <div className={styles.navigation}>
        <Link
          href={`/${activeLocale}${Pages.DESIGN_PORTFOLIOS}`}
          scroll={false}
          className={cn(styles.link, styles.line, !decodedProperty || decodedProperty === defaultSearchParam ? styles.active : '', Arial.className)}
        >
          <span>{t('buttons.view-all')}</span>
        </Link>
        {navbar}
      </div>
      <div className={styles.titles}>
        <div>
          <div className={cn(styles['title-line'], styles['back-line'])} />
          <h2 className={cn(styles['title-back'], Arial.className)}>{Titles.portfolio}</h2>
        </div>
        <div className={styles['bottom-title']}>
          <h1 className={cn(styles.title, Arial.className)}>{t('navigation.portfolios')}</h1>
          <div className={cn(styles['title-line'], styles['bottom-line'])} />
        </div>
      </div>
      <div className={styles.gallery}>
        {category.length === 0 ? (
          <div className={styles.loader}>
            <div className={styles['loader-card']} />
          </div>
        ) : (
          <div className='projects'>
            <Gallery projects={category} type='portfolios' />
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(Portfolios);
