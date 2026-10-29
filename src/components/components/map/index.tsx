'use client';

import styles from './styles.module.sass';

interface Props {
    width?: string;
    height?: string;
}

export default function GoogleMaps({
    width = '100%',
    height = '400px',
}: Props) {
    return (
        <iframe
            title="GoogleMaps"
            src={process.env.NEXT_PUBLIC_MAP_URL}
            width={width}
            height={height}
            className={styles.iframe}
            style={{ borderRadius: 10 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Google Maps location"
        />
    );
};
