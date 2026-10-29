'use client'

import React from 'react';

import NextImage from '@/src/components/components/image';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath } from '@/src/store/player_reducer';

import { MdPlayCircle } from 'react-icons/md';

import { ReduxType } from '@/src/types/language';
import { ImagePath } from '@/src/types/general';

import colors from '@/src/themes';

import styles from './styles.module.sass';


interface Props {
    light: ImagePath;
    link: string;
    alt: string;
};

const VideoPlayer = ({ light, link, alt }: Readonly<Props>) => {
    const isPlay = useSelector((state: ReduxType) => state.player.isPlay);
    const dispatch = useDispatch();

    const handlePlayVideo = (path: string) => {
        dispatch(onPlay(!isPlay));
        dispatch(setPath(path));
    };

    return (
        <div className={styles.playing}>
            <NextImage
                src={light?.src}
                alt={alt}
                className={styles.video_play}
                width={500}
                height={500}
            />
            <button
                className={styles.icon}
                onClick={() => handlePlayVideo(link)}
            >
                <MdPlayCircle size={75} color={colors.white} />
            </button>
        </div>
    )
};

export default React.memo(VideoPlayer);