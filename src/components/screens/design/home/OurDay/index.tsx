'use client'

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath } from '@/src/store/player_reducer';

import Player from '@/src/components/components/player';
import Container from '@/src/components/components/container';

import { Arial } from '@/src/constants/font';
import { Pages } from '@/src/constants/pages';
import { Titles } from '@/src/constants';
import { ImagePath } from '@/src/types/general';
import { ReduxType } from '@/src/types/language';

import { urlForImage } from '@/sanity/imageUrlBuilder';
import VideoPreview from '@/sanity/videoBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    our_day: OUR_DAY;
};

const OurDay = ({ our_day }: Readonly<Props>) => {
    const [url, setUrl] = useState<string>('');
    const path: ImagePath = urlForImage(our_day.video?.video_light)
    const isPlay = useSelector((state: ReduxType) => state.player.isPlay);
    const dispatch = useDispatch();
    const t = useTranslations();
    const localActive = useLocale();

    const handlePlayVideo = (path: string) => {
        dispatch(onPlay(!isPlay));
        dispatch(setPath(path));
    };

    useEffect(() => {
        if (our_day.video?.useUpload) {
            const videoUrl = VideoPreview(our_day.video?.videoFile);
            setUrl(videoUrl?.url);
        } else {
            setUrl(our_day.video?.video_url);
        }
    }, [our_day.video?.useUpload, our_day.video?.videoFile, our_day.video?.video_url]);

    return (
        <div className={styles.container}>
            <div className={styles.titles}>
                <div>
                    <div className={cn(styles['title-line'], styles['back-line'])} />
                    <h2 className={cn(styles['title-back'], Arial.className)}>{Titles.ourDay}</h2>
                </div>
                <div className={styles['bottom-title']}>
                    <h1 className={cn(styles.title, Arial.className)}>{t('sections.our-day')}</h1>
                    <div className={cn(styles['title-line'], styles['bottom-line'])} />
                </div>
            </div>
            <Container className='container'>
                <div className={styles.player}>
                    <Player
                        path={path}
                        video_url={url}
                        handlePlayVideo={handlePlayVideo}
                    />
                </div>
            </Container>
            <div className={styles.button_group}>
                <Link
                    href={`/${localActive}${Pages.DESIGN_CONTACT}`}
                    aria-label={Pages.DESIGN_CONTACT}
                    className={cn(styles.link, Arial.className)}
                    prefetch={true}
                    passHref
                >
                    {t('buttons.register-now')}
                </Link>
            </div>
        </div>
    )
};

export default React.memo(OurDay);