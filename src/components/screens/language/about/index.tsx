'use client'

import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { PortableText } from '@portabletext/react';
import Container from '@/src/components/components/container';
import NextImage from '@/src/components/components/image';

import VideoPlayer from './player';

import { Arial, Calibri } from '@/src/constants/font';
import { Pages } from '@/src/constants/pages';
import components from '@/src/helpers/PortableTextComponents';

import { urlForImage } from '@/sanity/imageUrlBuilder';
import VideoPreview from '@/sanity/videoBuilder';

import { VIDEO } from '@/src/types/language';
import { ImagePath } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: HOME_DETALIS_LANGUAGE_QUERYResult;
    locale: string;
};

const About = ({ data, locale }: Readonly<Props>) => {
    const t = useTranslations();

    const gallery: JSX.Element[] = data.about_us?.about_us_images?.map((item: ImagePath, index: number) => {
        const path: ImagePath = urlForImage(item);

        return (
            <NextImage
                key={index}
                src={path?.src}
                alt={item?.alt}
                className={styles.image}
                width={500}
                height={500}
            />
        );
    });

    const videos = data?.about_us?.about_our_daily.map((video: VIDEO) => {
        const path: ImagePath = urlForImage(video.video?.video_light);
        
        const url = video.video?.useUpload 
            ? VideoPreview(video.video?.videoFile)?.url 
            : video.video?.video_url;
    
        return (
            <VideoPlayer
                key={video._key}
                light={path}
                link={url}
                alt={video.video.video_light?.alt}
            />
        );
    });
    

    return (
        <section id='about' className={styles.container}>
            <Container className='container'>
                <div className={styles.about}>
                    <div className={styles.column}>
                        <h1 className={cn(styles.title, Arial.className)}>
                            {t('sections.about')}
                        </h1>
                        <div className={cn(styles.text, Calibri.className)}>
                            <PortableText
                                value={data?.about_us?.content}
                                components={components}
                            />
                        </div>
                        <div className={styles.buttons}>
                            <Link
                                href={`/${locale}${Pages.LANGUAGE_TAKE_TEST}`}
                                prefetch={true}
                                className={cn(
                                    styles.button,
                                    Arial.className,
                                    styles.send_btn
                                )}
                            >
                                {t('texts.take-the-test')}
                            </Link>
                        </div>
                    </div>
                    <div className={styles.gallery}>
                        <div className={styles.gallery_one}>
                            {gallery[0]}
                        </div>
                        <div className={styles.gallery_two}>
                            {gallery[1]}
                        </div>
                        <div className={styles.gallery_three}>
                            {gallery[2]}
                        </div>
                    </div>
                    <div className={styles.expanding_gallery}>
                        <div className={styles.expanding}>{gallery}</div>
                    </div>
                    <div className={styles.videos}>
                        {videos}
                    </div>
                </div>
            </Container>
        </section>
    )
};

export default React.memo(About);