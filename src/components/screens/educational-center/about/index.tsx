'use client'

import { useTranslations } from 'next-intl';

import { Inter } from '@/src/constants/font';

import Container from '@/src/components/components/container';

import { PortableText } from '@portabletext/react';
import components from '@/src/helpers/PortableTextComponents';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: ABOUT;
};

const AboutUs = ({ data: { about_us_content } }: Readonly<Props>) => {
    const t = useTranslations();

    return (
        <section className={styles.section}>
            <Container className='container'>
                <h1 className={cn(styles.title, Inter.className)}>
                    {t('sections.about')}
                </h1>
                <div className={styles.about}>
                <div className={styles.box}>
                    <div className={cn(styles.content, Inter.className)}>
                        <PortableText
                            value={about_us_content}
                            components={components}
                        />
                    </div>
                    </div>
                </div>
            </Container>
        </section>
    )
};

export default AboutUs;