"use client"

import { useEffect, useState } from 'react';

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState<number | any>({
        width: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
            });
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowSize;
};