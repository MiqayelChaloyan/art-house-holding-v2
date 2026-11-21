'use client';

import React, { useEffect, useRef } from 'react';

import styles from './styles.module.sass';


const NUMERALS = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

const Clock = () => {
    const hourRef = useRef<SVGGElement>(null);
    const minuteRef = useRef<SVGGElement>(null);
    const secondRef = useRef<SVGGElement>(null);
    const handsRef = useRef<SVGGElement>(null);

    useEffect(() => {
        let frame = 0;

        const tick = () => {
            const now = new Date();
            const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
            const minutes = now.getMinutes() + seconds / 60;
            const hours = (now.getHours() % 12) + minutes / 60;

            hourRef.current?.setAttribute('transform', `rotate(${hours * 30} 200 200)`);
            minuteRef.current?.setAttribute('transform', `rotate(${minutes * 6} 200 200)`);
            secondRef.current?.setAttribute('transform', `rotate(${seconds * 6} 200 200)`);
            frame = requestAnimationFrame(tick);
        };

        tick();
        handsRef.current?.setAttribute('data-ready', 'true');

        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <svg className={styles.clock} viewBox="0 0 400 400" role="img" aria-label="Clock">
            <g fill="none" stroke="#2b2b2b">
                <circle cx="200" cy="200" r="188" strokeWidth="10" />
                <circle cx="200" cy="200" r="108" strokeWidth="7" />
            </g>
            <g fill="#2b2b2b">
                <rect x="194" y="96" width="4" height="208" />
                <rect x="202" y="96" width="4" height="208" />
                <rect x="96" y="194" width="208" height="4" />
                <rect x="96" y="202" width="208" height="4" />
            </g>
            <g className={styles.numerals}>
                {NUMERALS.map((numeral, index) => (
                    <text
                        key={numeral}
                        x="200"
                        y="62"
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={`rotate(${index * 30} 200 200)`}
                    >
                        {numeral}
                    </text>
                ))}
            </g>
            <g ref={handsRef} className={styles.hands}>
                <g ref={hourRef}>
                    <path d="M196 214 L197.5 118 L200 104 L202.5 118 L204 214 Z" fill="#1f1f1f" />
                </g>
                <g ref={minuteRef}>
                    <path d="M197 220 L198.5 70 L200 50 L201.5 70 L203 220 Z" fill="#1f1f1f" />
                </g>
                <g ref={secondRef}>
                    <rect x="199.2" y="44" width="1.6" height="190" fill="#b21b1b" />
                    <circle cx="200" cy="226" r="5" fill="#b21b1b" />
                </g>
                <circle cx="200" cy="200" r="20" fill="#2b2b2b" />
                <circle cx="200" cy="200" r="4" fill="#b21b1b" />
            </g>
        </svg>
    );
};

export default React.memo(Clock);
