'use client'

import RatingCard from '../RatingCard';

import { urlForImage } from '@/sanity/imageUrlBuilder';
import { Options } from '@/src/types/educational-center';
import { ImagePath } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


const MobileCards = (data: Options | any, slideIndex: string | number) => {
    const feedbacks = data?.map((card: Options | any, index: string): JSX.Element => {

        const urlForImageBackground: ImagePath = urlForImage(card.our_rating_section_image);
        const path: ImagePath = urlForImage(card.user_image);

        const urlImageBackgroundAlt = card.our_rating_section_image.alt;
        const urlImageAlt = card.user_image.alt;
        const name = card.user_name;

        const options = {
            name,
            urlForImageBackground: urlForImageBackground.src,
            urlImageBackgroundAlt,
            urlForImage: path?.src,
            urlImageAlt,
            result: card?.user_feedback,
            rating: card.rating + 1,
        };

        return (
            <div
                key={card._key}
                className={index === slideIndex ?
                    cn(styles.slide, styles.slide_active) : styles.slide}
            >
                <RatingCard options={options} />
            </div>
        );
    });

    return feedbacks;
};

export default MobileCards;