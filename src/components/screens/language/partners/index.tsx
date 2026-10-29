'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import NextImage from '@/src/components/components/image';
import Container from '@/src/components/components/container';

import { Arial, Vrdznagir } from '@/src/constants/font';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import { ImagePath } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    partners: PARTNER_Result[];
};

const Partners = ({ partners }: Readonly<Props>) => {
    const t = useTranslations('navigation');

    const result: JSX.Element[] = partners?.map((partner: PARTNER_Result) => {
        const path: ImagePath = urlForImage(partner.logo);

        return (
            <div key={partner._id} className={styles.card}>
                <NextImage
                    src={path?.src}
                    alt={partner?.logo.alt}
                    className={styles.img}
                    width={500}
                    height={500}
                />
                <div className={styles.overlay}>
                    <h1 className={cn(styles['text-h1'], Arial.className)}>
                        {partner.company_name}
                    </h1>
                    <p className={cn(styles['text-p'], Arial.className)}>
                        {partner.cooperation}
                    </p>
                    <p className={cn(styles['text-p'], Arial.className)}>
                        {partner.implemented_projects}
                    </p>
                </div>
            </div>
        )
    });

    return (
        <section id='partners' className={styles.container}>
            <Container className='container'>
                <h1 className={cn(styles.title, Vrdznagir.className)}>
                    {t('partners')}
                </h1>
                <div className={styles.partners}>
                    {result}
                </div>
            </Container>
        </section>
    )
}

export default React.memo(Partners);