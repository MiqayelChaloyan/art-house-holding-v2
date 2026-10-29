'use client'

import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/src/components/components/container';
import FormAppointment from '@/src/components/components/form-educational';

import Button from '@/src/lib/ui/Button';
import { Arial, Inter } from '@/src/constants/font';

import { PortableText } from '@portabletext/react';
import components from '@/src/helpers/PortableTextComponents';
import { flattenText, getTotalTextLength, truncateText } from '@/src/helpers/ArrayMaxItems';

import { ContentCourseType } from '@/src/types/educational-center';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    course: COURSES_QUERYResult;
    socialData: CONTACT_US_QUERYResult;
    lessons: LESSON[];
    lessonsArmenian: LESSON[];
};

const Content = ({ content, isReadMore, minimumHeight }: ContentCourseType) => {
    const flatText = flattenText(content);
    const text = isReadMore && flatText.length > minimumHeight
        ? truncateText(content, minimumHeight)
        : content;

    return (
        <div className={cn(styles.content, Inter.className)}>
            <PortableText
                value={text}
                components={components}
            />
        </div>
    );
};

const About = ({
    course: { about_us_content, about_us_title },
    socialData,
    lessons,
    lessonsArmenian
}: Readonly<Props>) => {
    const [isReadMore, setIsReadMore] = useState<boolean>(true);
    const t = useTranslations();
    const minimumHeight = 500;

    const toggleReadMore = () => setIsReadMore(!isReadMore);

    return (

        <section id='about-us' className={styles.container}>
            <div className={styles.shapes}>
                <div className={styles['rounds']}>
                    <div className={cn(styles.shape, styles['shape-1'])}>
                        <h1 className={cn(styles.title, about_us_title.length >= 30 ? styles['title-large'] : styles['title-small'])}>
                            {about_us_title}
                        </h1>
                    </div>
                </div>
            </div>
            <section id='about-us' className={styles.container}>
                <Container className='container'>
                    <div className={styles.about_us}>
                        <div className={styles.about_box}>
                            {getTotalTextLength(about_us_content) > minimumHeight ?
                                <>
                                    <Content
                                        content={about_us_content}
                                        isReadMore={isReadMore}
                                        minimumHeight={minimumHeight}
                                    />
                                    <Button
                                        text={isReadMore ? t('buttons.view-more') : t('buttons.show-less')}
                                        className={cn(styles.button, styles['view-more-btn'], Arial.className)}
                                        onClick={toggleReadMore}
                                    />
                                </>
                                :
                                <div className={cn(styles.content, Inter.className)}>
                                    <PortableText
                                        value={about_us_content}
                                        components={components}
                                    />
                                </div>
                            }
                        </div>
                        <div className={styles.form_box}>
                            <FormAppointment
                                social_links={socialData?.social_links}
                                lessons={lessons}
                                lessonsArmenian={lessonsArmenian}
                                theme={colors.black}
                            />
                        </div>
                    </div>
                </Container>
            </section>
        </section>
    );
};

export default React.memo(About);