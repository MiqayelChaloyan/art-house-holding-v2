'use client';

import React, { useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import styles from './styles.module.sass';

interface Props {
    children: React.ReactNode;
    className?: string;
    innerClassName?: string;
}

const TOP_OFFSET = 100;
const MOBILE_BREAKPOINT = 768;

const StickySidebar = ({ children, className, innerClassName }: Readonly<Props>) => {
    const slotRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        const update = () => {
            const slot = slotRef.current;
            const panel = panelRef.current;

            if (!slot || !panel) {
                return;
            }

            if (window.innerWidth <= MOBILE_BREAKPOINT) {
                setPanelStyle({});
                return;
            }

            const slotRect = slot.getBoundingClientRect();
            const panelHeight = panel.offsetHeight;
            const shouldFix = slotRect.top <= TOP_OFFSET;
            const bottomReached = slotRect.bottom <= panelHeight + TOP_OFFSET;

            if (shouldFix && !bottomReached) {
                const left = Math.max(0, slotRect.left);
                const width = Math.min(slotRect.width, window.innerWidth - left);

                setPanelStyle({
                    position: 'fixed',
                    top: TOP_OFFSET,
                    left,
                    width,
                    maxHeight: `calc(100vh - ${TOP_OFFSET + 20}px)`,
                });
                return;
            }

            if (bottomReached) {
                setPanelStyle({
                    position: 'absolute',
                    top: Math.max(0, slot.offsetHeight - panelHeight),
                    left: 0,
                    width: '100%',
                    maxHeight: `calc(100vh - ${TOP_OFFSET + 20}px)`,
                });
                return;
            }

            setPanelStyle({});
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);

        const observer = typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(update)
            : null;

        if (observer && panelRef.current && slotRef.current) {
            observer.observe(panelRef.current);
            observer.observe(slotRef.current);
        }

        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
            observer?.disconnect();
        };
    }, [children]);

    return (
        <aside ref={slotRef} className={cn(styles.slot, className)}>
            <div ref={panelRef} className={cn(styles.panel, innerClassName)} style={panelStyle}>
                {children}
            </div>
        </aside>
    );
};

export default React.memo(StickySidebar);
