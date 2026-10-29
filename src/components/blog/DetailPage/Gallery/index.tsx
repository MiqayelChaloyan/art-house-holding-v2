'use client';

import React from 'react';

import NextImage from '@/src/components/components/image';

import { BlogSiteConfig } from '@/src/components/blog/config';

import cn from 'classnames';

import styles from './styles.module.sass';

interface Props {
    images: BLOG_GALLERY_IMAGE[];
    caption?: string;
    config?: BlogSiteConfig;
}

const Gallery = ({ images, caption, config }: Readonly<Props>) => {
    if (!images?.length) {
        return null;
    }

    const [firstImage, secondImage, thirdImage, ...restImages] = images;

    const renderImage = (image: BLOG_GALLERY_IMAGE, className?: string) => {
        const path = image.imagePath;

        if (!path?.src) {
            return null;
        }

        return (
            <figure className={cn(styles.figure, className)}>
                <NextImage
                    src={path.src}
                    alt={image?.alt || 'Blog gallery image'}
                    width={800}
                    height={600}
                    className={styles.image}
                />
            </figure>
        );
    };

    return (
        <div className={styles.gallery}>
            {images.length >= 3 ? (
                <div className={styles.gridLarge}>
                    <div className={styles.gridSmall}>
                        {renderImage(firstImage, styles.smallItem)}
                        {secondImage && renderImage(secondImage, styles.smallItem)}
                    </div>
                    {thirdImage && renderImage(thirdImage, styles.largeItem)}
                </div>
            ) : (
                <div className={cn(styles.gridSimple, images.length === 1 && styles.gridSingle)}>
                    {images.map((image) => (
                        <div key={image._key}>
                            {renderImage(image, styles.simpleItem)}
                        </div>
                    ))}
                </div>
            )}
            {restImages.length > 0 && (
                <div className={styles.gridRest}>
                    {restImages.map((image) => (
                        <div key={image._key}>
                            {renderImage(image, styles.restItem)}
                        </div>
                    ))}
                </div>
            )}
            {caption && (
                <p className={cn(styles.caption, config?.bodyFont.className)}>{caption}</p>
            )}
        </div>
    );
};

export default React.memo(Gallery);
