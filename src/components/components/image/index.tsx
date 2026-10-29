'use client';

import { ImgHTMLAttributes } from 'react';
import Image from 'next/image';

interface NextImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    width: number;
    height: number;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    sizes?: string;
};

const NextImage = ({
    src,
    alt = 'Image',
    width,
    height,
    className,
    priority = false,
    loading,
    sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    ...rest
}: NextImageProps) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            quality={80}
            priority={priority}
            loading={loading ?? (priority ? 'eager' : 'lazy')}
            sizes={sizes}
            {...rest}
        />
    );
};

export default NextImage;
