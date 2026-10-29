'use client'

import React from 'react';

import RatingCard from '../RatingCard';

import { urlForImage } from '@/sanity/imageUrlBuilder';
import { ImagePath } from '@/src/types/general';

const sizes = [
    {
        top: 60,
        left: 2,
        bottom: 20
    },
    {
        top: 40,
        left: 15,
        bottom: 40
    },
    {
        top: 70,
        left: 2,
        bottom: 5
    }
];

interface Props {
    data: OUR_RATING[];
};

const Rating = ({ data }: Readonly<Props>) =>
    data?.map((card: OUR_RATING, index: number): JSX.Element => {
        const urlForImageBackground: ImagePath = urlForImage(card.our_rating_section_image);
        const path: ImagePath = urlForImage(card.user_image);

        const urlImageBackgroundAlt = card.our_rating_section_image.alt;
        const urlImageAlt = card.user_image.alt;
        const name = card.user_name;

        const options = {
            name,
            urlForImageBackground: urlForImageBackground.src,
            urlImageBackgroundAlt,
            urlForImage: path.src,
            urlImageAlt,
            result: card?.user_feedback,
            rating: card.rating + 1,
            ...sizes[index],
        };

        return <RatingCard key={card._key} options={options} />;
});

export default React.memo(Rating);