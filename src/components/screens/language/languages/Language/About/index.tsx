'use client'

import React from 'react';

import NextImage from '@/src/components/components/image';

import components from '@/src/helpers/PortableTextComponents';
import { PortableText } from '@portabletext/react';

import { Arial } from '@/src/constants/font';
import { ABOUT } from '@/src/types/language';
import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    image: Asset;
    text: TEXT[];
};

const About = ({ image, text }: Readonly<Props>) => {
    const language: ImagePath = urlForImage(image);

    return (
        <div className={styles.row_one}>
            <div className={styles.left_side}>
                <NextImage
                    src={language?.src}
                    alt={image?.alt}
                    className={styles.image}
                    width={500}
                    height={500}
                />
            </div>
            <div className={cn(styles.right_side, Arial.className)}>
                <PortableText
                    value={text}
                    components={components}
                />
            </div>
        </div>
    )
};

export default React.memo(About);