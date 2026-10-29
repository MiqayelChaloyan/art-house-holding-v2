'use client'

import React from 'react';

import Link from 'next/link';
import { useLocale } from 'next-intl';

import NextImage from '@/src/components/components/image';

import { Arial } from '@/src/constants/font';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import { ImagePath } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    project: PORTFOLIO;
    course_name?: string;
    slug: string;
    type?: string;
};

const PortfolioImageCard = ({
    project,
    course_name,
    slug,
    type
}: Readonly<Props>) => {
    const cardImagePath: ImagePath = urlForImage(project.image);
    const activeLocale = useLocale();
    const { _key, author, image: { alt } } = project;

    return (
        <Link href={`/${activeLocale}/design/${type}/${encodeURIComponent(slug)}#${encodeURIComponent(_key)}`}>
            <figure className={styles.figure}>
                <NextImage
                    src={cardImagePath?.src}
                    alt={alt}
                    className={styles.image}
                    width={500}
                    height={500}
                />
                <div className={styles.overlay}>
                    <div className={styles.items} />
                    <div className={cn(styles.author, styles.items)}>
                        <p className={Arial.className}>{author}</p>
                        <hr />
                    </div>
                    <div className={cn(styles['course-name'], styles.items)}>
                        <p className={Arial.className}>{course_name}</p>
                    </div>
                </div>
            </figure>
        </Link>
    );
};

export default React.memo(PortfolioImageCard);