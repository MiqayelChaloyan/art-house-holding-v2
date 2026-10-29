'use client'

import { useEffect } from 'react';

import { motion, Variants, useAnimationControls, useScroll } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

import styles from './styles.module.sass';


const ScrollToTopContainerVariants: Variants = {
    hide: { opacity: 1, y: 300 },
    show: { opacity: 1, y: 0 },
};

function ScrollToTopButton({ theme }: any) {
    const { scrollYProgress } = useScroll();
    const controls = useAnimationControls();

    useEffect(() => {
        return scrollYProgress.on('change', (latestValue) => {
            if (latestValue > 0.2) {
                controls.start('show');
            } else {
                controls.start('hide');
            }
        });
    });

    const isBrowser = () => typeof window !== 'undefined';

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <motion.button
            className={styles.button}
            variants={ScrollToTopContainerVariants}
            initial="hide"
            animate={controls}
            onClick={scrollToTop}
            style={{ background: theme }}
        >
            <FaArrowUp size={25} />
        </motion.button>
    );
}

export default ScrollToTopButton;