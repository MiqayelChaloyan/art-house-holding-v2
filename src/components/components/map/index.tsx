'use client';

import styles from './styles.module.sass';


const FALLBACK_MAP_URL =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.957283740513!2d44.520647976382314!3d40.187764071477375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abce09c329a4b%3A0x190558989842c3c2!2s33%20Abovyan%20poxoc%2C%20Yerevan%200009!5e0!3m2!1sru!2sam!4v1699959125372!5m2!1sru!2sam';

interface Props {
    width?: string;
    height?: string;
}

export default function GoogleMaps({
    width = '100%',
    height = '400px',
}: Props) {
    const src = process.env.NEXT_PUBLIC_MAP_URL || FALLBACK_MAP_URL;

    return (
        <iframe
            title="GoogleMaps"
            src={src}
            width={width}
            height={height}
            className={styles.iframe}
            style={{ borderRadius: 10, minHeight: 280 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Google Maps location"
        />
    );
};
