'use client'

import Link from 'next/link';

import NextImage from '@/src/components/components/image';

import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import { Gallery } from '@/src/types/design';

import styles from './styles.module.sass';


interface Props {
    image: Gallery;
};

const WorkImage = ({ image }: Readonly<Props>) => {
    const path: ImagePath = urlForImage(image);

    return (
        <Link data-fancybox="gallery" href={path?.src}>
            <NextImage
                src={path?.src}
                alt={image?.alt}
                className={styles.work_img}
                width={500}
                height={500}
                style={{ objectFit: 'cover' }}
            />
        </Link>
    )
};

export default WorkImage;