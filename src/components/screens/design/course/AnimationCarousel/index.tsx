'use client'

import React, { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from '@popmotion/popcorn';

import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import styles from './styles.module.sass';


interface Props {
    gallery: GALLERY[];
};

const sliderVariants = {
    incoming: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        scale: 1.2,
        opacity: 0,
    }),
    active: { x: 0, scale: 1, opacity: 1 },
    exit: (direction: number) => ({
        x: direction > 0 ? '-100%' : '100%',
        scale: 1,
        opacity: 0.5,
    }),
}

const sliderTransition = {
    duration: 1,
    ease: [0.56, 0.03, 0.12, 1.04],
}

const AnimationCarousel = ({ gallery }: Readonly<Props>) => {
    const [[imageCount, direction], setImageCount] = useState([0, 0])

    const IMAGES = gallery.map((image: any) => {
        const path: ImagePath = urlForImage(image)
        return { id: image._id, imageSrc: path?.src }
    })

    const activeImageIndex = wrap(0, IMAGES.length, imageCount)

    const swipeToImage = (swipeDirection: number) => {
        setImageCount([imageCount + swipeDirection, swipeDirection])
    }

    const dragEndHandler = (dragInfo: { offset: { x: number } }) => {
        const draggedDistance = dragInfo.offset.x
        const swipeThreshold = 50
        if (draggedDistance > swipeThreshold) {
            swipeToImage(-1)
        } else if (draggedDistance < -swipeThreshold) {
            swipeToImage(1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setImageCount(([count]) => [count + 1, 1])
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className={styles['slider-container']}>
            <div className={styles.slider}>
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={imageCount}
                        style={{
                            backgroundImage: `url(${IMAGES[activeImageIndex].imageSrc})`,
                        }}
                        custom={direction}
                        variants={sliderVariants}
                        initial="incoming"
                        animate="active"
                        exit="exit"
                        transition={sliderTransition}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
                        className={styles['design-image']}
                    />
                </AnimatePresence>
            </div>
        </div>
    )
};

export default React.memo(AnimationCarousel);
