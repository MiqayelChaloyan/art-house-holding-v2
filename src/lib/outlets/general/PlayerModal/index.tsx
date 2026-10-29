'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath, statePlayer } from '@/src/store/player_reducer';

import ReactPlayer from 'react-player';
import { IoClose } from 'react-icons/io5';

import { ImagePath } from '@/src/types/general';
import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


const PlayerModal = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const componentRef = useRef<HTMLDivElement>(null);

    const isPlay: boolean = useSelector((state: { player: statePlayer }) => state.player.isPlay);
    const path: ImagePath = useSelector((state: { player: statePlayer }) => state.player.path);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isPlay) {
            const timerId = setTimeout(() => setShowModal(true), 1);
            return () => clearTimeout(timerId);
        } else {
            setShowModal(false);
        }
    }, [isPlay]);

    const video = useMemo(
        () => (
            <ReactPlayer
                className="react-player"
                url={path}
                controls
                width="100%"
                height="100%"
                playing={isPlay}
            />
        ),
        [path, isPlay]
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
                setShowModal(false);
                dispatch(onPlay(false));
                dispatch(setPath(null));
            }
        };

        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showModal, dispatch]);

    if (!isMounted) {
        return null;
    }

    return (
        <div className={cn(styles.box, isPlay && showModal ? styles.boxOpen : '')}>
            <div className={styles.wrap}>
                <div
                    className={cn(styles.overlay, { [styles.overlayShow]: showModal })}
                    onClick={() => {
                        setShowModal(false);
                        dispatch(onPlay(false));
                        dispatch(setPath(null));
                    }}
                ></div>
                <div className={cn(styles.content, { [styles.contentShow]: showModal })}>
                    <button
                        className={styles.close}
                        title="Close"
                        onClick={() => {
                            setShowModal(false);
                            dispatch(onPlay(false));
                            dispatch(setPath(null));
                        }}
                    >
                        <IoClose size={100} fill={colors.white} />
                    </button>
                    <div ref={componentRef} className={styles.video}>
                        {video}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerModal;
