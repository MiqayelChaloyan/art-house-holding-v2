'use client'

import NextImage from '@/src/components/components/image';

import { ImagePath } from '@/src/types/general';
import { ArianAMU } from '@/src/constants/font';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    review: OUR_RATING;
};

const Testimonial = ({ review }: Readonly<Props>) => {
    const path: ImagePath = urlForImage(review?.user_image);

    return (
        <div className={styles.slide}>
            <figure className={styles.card}>
                <span className={styles.quote} aria-hidden='true'>&ldquo;</span>
                <blockquote className={cn(styles.feedback, ArianAMU.className)}>
                    {review?.user_feedback}
                </blockquote>
                <figcaption className={styles.details}>
                    {path?.src && (
                        <div className={styles.box}>
                            <NextImage
                                src={path.src}
                                alt={review?.user_image?.alt}
                                className={styles.image}
                                width={160}
                                height={160}
                                sizes='80px'
                            />
                        </div>
                    )}
                    <span className={cn(styles.name, ArianAMU.className)}>
                        {review?.user_name}
                    </span>
                </figcaption>
            </figure>
        </div>
    )
};

export default Testimonial;
