'use client'

import React, { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/src/components/components/container';
import Player from '@/src/components/components/player';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath } from '@/src/store/player_reducer';

import { urlForImage } from '@/sanity/imageUrlBuilder';
import VideoPreview from '@/sanity/videoBuilder';

import { ImagePath } from '@/src/types/general';
import { ReduxType } from '@/src/types/language';

import { Inter } from '@/src/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    course: { video: VIDEO };
};

const CourseProcess = ({ course }: Readonly<Props>) => {
    const [url, setUrl] = useState<string>('');
    const t = useTranslations('sections');

    const path: ImagePath = urlForImage(course.video?.video_light);
    const isPlay = useSelector((state: ReduxType) => state.player.isPlay);
    const dispatch = useDispatch();

    const handlePlayVideo = (path: string) => {
        dispatch(onPlay(!isPlay));
        dispatch(setPath(path));
    };

    useEffect(() => {
        if (course.video?.useUpload) {
            const videoUrl = VideoPreview(course.video?.videoFile);
            setUrl(videoUrl?.url);
        } else {
            setUrl(course.video?.video_url);
        }
    }, [course.video?.useUpload, course.video?.videoFile, course.video?.video_url]);

    return (
        <section id='video-player' className={styles.section}>
            <Container className='container'>
                <h1 className={cn(styles.title, Inter.className)}>
                    {t('courses-process')}
                </h1>
                <Player
                    path={path}
                    video_url={url}
                    handlePlayVideo={handlePlayVideo}
                />
            </Container>
        </section>
    );
};

export default React.memo(CourseProcess);

