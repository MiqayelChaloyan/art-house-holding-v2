'use client'

import NextImage from '@/src/components/components/image';

import { Arial } from '@/src/constants/font';

import { urlForImage } from '@/sanity/imageUrlBuilder';
import { ImagePath } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface CardProps {
    discount: DISCOUNTS_LANGUAGE;
    index: number;
    classNameProperty: string;
}

const Promotion = ({
    discount,
    index,
    classNameProperty
}: CardProps) => {
    const aboutText = discount.about_discount.length > 150 ?
        discount.about_discount.slice(0, 200) + '...' : discount.about_discount;
    const path: ImagePath = urlForImage(discount.image);
    const transformRotate = index % 2 === 0;

    return (
        <div key={discount.slug} className={styles[`${classNameProperty}-card`]}>
            <div className={cn(
                styles['boundary-up'],
                transformRotate ? styles['boundary-up-top'] : styles['boundary-up-end']
            )}>
                <h3 className={cn(
                    styles[`${classNameProperty}-discount`],
                    transformRotate ? styles['discount-rotate-top'] : styles['discount-rotate-end'],
                    Arial.className
                )}>
                    {`${discount.procent}%`}
                </h3>
                <NextImage
                    key={index}
                    src={path?.src}
                    alt={discount.image.alt}
                    className={styles[`${classNameProperty}-card-attribute-image`]}
                    width={500}
                    height={500}
                />
            </div>
            <div className={styles[`${classNameProperty}-boundary-end`]}>
                <p className={cn(
                    styles[`${classNameProperty}-about-discount`],
                    Arial.className
                )}>
                    {aboutText}
                </p>
            </div>
        </div>
    )
};

export default Promotion;