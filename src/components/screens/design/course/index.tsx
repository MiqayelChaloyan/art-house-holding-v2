'use client'

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import useWindowSize from '@/src/hooks/useWindowSize';

import Checkmark from '@/src/lib/icons/design/Checkmark';
import PortfolioImageCard from '@/src/lib/ui/portfolio-card';

import { Pages } from '@/src/constants/pages';
import { Arial } from '@/src/constants/font';
import { Titles } from '@/src/constants';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


const AnimatedComponent = dynamic(() => import('./AnimationCarousel'), { ssr: false });

interface Props {
  locale: string;
  course: COURSES_DESIGN_QUERYResult;
};

interface BoxProps {
  guide: string;
  iconSize: number;
};

const Box = ({ guide, iconSize }: Readonly<BoxProps>) => (
  <div className={cn(styles.hex)}>
    <Checkmark width={20} height={18} fill={colors.white} />
    <p className={cn(styles['our-advantages'], Arial.className)}>{guide}</p>
  </div>);


const Course = ({ locale, course }: Readonly<Props>) => {
  const { gallery_of_course, course_name, conditions, guides, name, portfolios } = course;
  const latestProjects = portfolios?.slice(Math.max(portfolios.length - 4, 0)) ?? [];
  const [index, setIndex] = useState<number>(0);
  const windoSize = useWindowSize();
  const t = useTranslations();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % gallery_of_course.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [index, gallery_of_course.length]);

  const terms = conditions?.map((condition: string, conditionIndex: number) =>
    <div key={conditionIndex} className={styles.term}>
      <li className={cn(styles.condition, Arial.className)}>{condition}</li>
    </div>);

  const roadbook = guides?.map((guide: string, guideIndex: number) =>
    <Box key={guideIndex} guide={guide} iconSize={windoSize.width} />);

  const projects = latestProjects?.map(project => (
    <PortfolioImageCard
      key={project._key}
      course_name={course_name}
      project={project}
      slug={course.slug}
      type='portfolios'
    />
  ));

  return (
    <section id='course' className={styles.container}>
      <div className={styles.line} />
      <div className={styles.course}>
        <div className={styles.left}>
          <AnimatedComponent gallery={gallery_of_course} />
        </div>
        <div className={styles.right}>
          <div>
            <h2 className={cn(styles['design-title-top'], Arial.className)}>{name}</h2>
            <div className={styles['design-corner-large-right']}>
              <h1 className={cn(styles['design-title'], Arial.className)}>
                {course_name}
              </h1>
            </div>
            <h1 className={cn(styles['design-title-mobile'], Arial.className)}>
              {course_name}
            </h1>
          </div>
          <div className={styles.conditions}>
            <ul className={styles.list}>
              {terms}
            </ul>
          </div>
        </div>
      </div>
      <div>
        {roadbook}
      </div>
      <div className={styles.porfolio}>
        <div className={styles.titles}>
          <div>
            <div className={cn(styles['title-line'], styles['back-line'])} />
            <h2 className={cn(styles['title-back'], Arial.className)}>{Titles.portfolios}</h2>
          </div>
          <div className={styles['bottom-title']}>
            <h1 className={cn(styles['title-portfolio'], Arial.className)}>{t('sections.portfolios')}</h1>
            <div className={cn(styles['title-line'], styles['bottom-line'])} />
          </div>
        </div>
        <div className={styles.projects}>
          {projects}
        </div>
        <div className={styles.button}>
          <Link
            href={{
              pathname: `/${locale}${Pages.DESIGN_PORTFOLIOS}`,
              query: { name },
            }}
            className={cn(styles.link, Arial.className)}
          >
            {t('buttons.view-all')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Course);