'use client'

import React, { useEffect, useState } from 'react';

import About from './About';
import Teachers from './Teachers';
import Gallery from './Gallery';

import Container from '@/src/components/components/container';
import Player from '@/src/components/components/player';

import { ReduxType } from '@/src/types/language';
import { ImagePath } from '@/src/types/general';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath } from '@/src/store/player_reducer';

import { urlForImage } from '@/sanity/imageUrlBuilder';
import VideoPreview from '@/sanity/videoBuilder';

import styles from './styles.module.sass';


interface Props {
    data: LANGUAGE;
};

const Language = ({ data }: Readonly<Props>) => {
    const [url, setUrl] = useState<string>('');
    const { during_courses_images, course_process, teachers } = data;
    const path: ImagePath = urlForImage(course_process.video?.video_light);

    const isPlay = useSelector((state: ReduxType) => state.player.isPlay);
    const dispatch = useDispatch();

    const handlePlayVideo = (path: string) => {
        dispatch(onPlay(!isPlay));
        dispatch(setPath(path));
    };

    useEffect(() => {
        if (course_process.video?.useUpload) {
            const videoUrl = VideoPreview(course_process.video?.videoFile);
            setUrl(videoUrl?.url);
        } else {
            setUrl(course_process.video?.video_url);
        }
    }, [course_process.video?.useUpload, course_process.video?.videoFile, course_process.video?.video_url]);

    return (
        <Container className='container'>
            <section id='language'>
                <About image={data.image} text={data.text} />
                <Gallery during_courses={during_courses_images} />
                <div className={styles.row_three}>
                    <div className={styles.video_player}>
                        <Player
                            path={path}
                            video_url={url}
                            handlePlayVideo={handlePlayVideo}
                        />
                    </div>
                </div>
                <Teachers teachers={teachers} />
            </section>
        </Container>
    );
};

export default React.memo(Language);