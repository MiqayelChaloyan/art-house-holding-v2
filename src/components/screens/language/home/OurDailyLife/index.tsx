'use client'

import React, { useEffect, useState } from 'react';

import { notFound, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Container from '@/src/components/components/container';
import NextImage from '@/src/components/components/image';

import { MdPlayCircle } from 'react-icons/md';

import { DAILY_LIFE_IMAGE, DAILY_LIFE_VIDEO, ReduxType } from '@/src/types/language';
import { Arial, Vrdznagir } from '@/src/constants/font';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath } from '@/src/store/player_reducer';

import { client } from '@/sanity/client';
import { urlForImage } from '@/sanity/imageUrlBuilder';
import { LANGUAGE_ID_QUERY } from '@/sanity/services/language-service';
import VideoPreview from '@/sanity/videoBuilder';

import { ImagePath } from '@/src/types/general';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: HOME_DETALIS_LANGUAGE_QUERYResult;
    locale: string;
};

interface Video {
    item: DAILY_LIFE_VIDEO;
    locale: string;
};

interface Image {
    item: DAILY_LIFE_IMAGE;
};

const DailyLifeImage = ({ item }: Image) => {
    const path: ImagePath = urlForImage(item);

    return (
        <div className={styles.image}>
            <NextImage
                src={path?.src}
                alt={item?.alt}
                className={styles.images}
                width={500}
                height={500}
            />
        </div>
    )
};


const DailyLifeVideo = ({ item, locale }: Readonly<Video>) => {
    const [url, setUrl] = useState<string>('');
    const t = useTranslations('buttons');
    const router = useRouter();
    const dispatch = useDispatch();

    const isPlay = useSelector((state: ReduxType) => state.player.isPlay);
    const light: ImagePath = urlForImage(item.video?.video_light);

    const getResources = async () => {
        const _id = item.languages._ref;

        try {
            const data = await client.fetch(LANGUAGE_ID_QUERY, { _id, language: locale }, { cache: 'no-store' });
            router.push(`language/languages/${data.slug.current}`);
        } catch (error) {
            notFound();
        }
    };

    const handlePlayVideo = (path: string) => {
        dispatch(onPlay(!isPlay));
        dispatch(setPath(path));
    };

    useEffect(() => {
        if (item.video?.useUpload) {
            const videoUrl = VideoPreview(item.video?.videoFile);
            setUrl(videoUrl?.url);
        } else {
            setUrl(item.video?.video_url);
        }
    }, [item.video?.useUpload, item.video?.videoFile, item.video?.video_url]);

    return (
        <div className={styles.video}>
            <div className={styles.playing}>
                <NextImage
                    src={light?.src}
                    alt={item.video?.video_light.alt}
                    className={styles.video_play}
                    width={500}
                    height={500}
                />
                <button
                    className={styles.icon}
                    onClick={() => handlePlayVideo(url)}
                >
                    <MdPlayCircle size={75} color={colors.white} />
                </button>
            </div>
            <div className={styles.navigate}>
                <span className={cn(styles.text, Arial.className)}>
                    {item.news}
                </span>
                <div className={styles.btn}>
                    <button
                        className={cn(styles.view, Arial.className)}
                        onClick={getResources}
                    >
                        {t('view')}
                    </button>
                </div>
            </div>
        </div>
    )
};


const OurDailyLife = ({ data, locale }: Readonly<Props>) => {
    const t = useTranslations('sections');

    const images: JSX.Element[] = data.our_daily_life.our_daily_life_images.map((item: DAILY_LIFE_IMAGE | any) =>
        <DailyLifeImage key={item.slug.current} item={item} />
    );

    const videos: JSX.Element[] = data.our_daily_life.about_our_daily.map((item: DAILY_LIFE_VIDEO | any) =>
        <DailyLifeVideo key={item._key} item={item} locale={locale} />
    );

    const mixData = images.reduce((acc: any, image: any, index: number) => {
        acc.push(videos[index], image);
        return acc;
    }, []);

    const column1 = mixData.slice(0, Math.ceil(mixData.length / 2));
    const column2 = mixData.slice(Math.ceil(mixData.length / 2));

    return (
        <section id='our-daily' className={styles.section}>
            <Container className='container'>
                <div className={styles.ourDaily}>
                    <h2 className={cn(styles.title, Vrdznagir.className)}>
                        {t('our-daily')}
                    </h2>
                    <div className={styles.column}>
                        {column1}
                    </div>
                    <div className={styles.column}>
                        {column2}
                    </div>
                </div>
            </Container>
        </section>
    )
};

export default React.memo(OurDailyLife);