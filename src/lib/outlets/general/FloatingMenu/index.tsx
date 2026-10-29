'use client'

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { useLocale } from 'next-intl';

import { GoProjectSymlink } from 'react-icons/go';

import NextImage from '@/src/components/components/image';

import { ArianAMU } from '@/src/constants/font';
import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    website?: string;
    branches?: HOME_DETALIS_QUERYResult;
    theme?: string;
    hover?: string;
};

const FloatingMenu = ({ website, branches, theme, hover }: Props) => {
    const [data, setData] = useState<BRANCH[]>([]);
    const componentRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    const activeLocale = useLocale();

    useEffect(() => {
        const fetchWebsites = async () => {
            if (branches?.our_websites) {
                const websites = branches.our_websites.filter((branch: BRANCH) => branch.words !== website);
                setData(websites);
            }
        };

        fetchWebsites();
    }, [branches, website]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
                setIsActive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const links = data.map((link: any, index: number) => {
        const path: ImagePath = urlForImage(link.website_logo_front);

        return (
            <li
                key={index}
                style={{ background: hoveredIndex === index ? hover : '' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
            >
                <Link
                    href={`/${activeLocale}/${link.web_site_url}`}
                    aria-label={`/${activeLocale}/${link.web_site_url}`}
                >
                    <div className={styles.link}>
                        <div className={styles['logo-contain']}>
                            <NextImage
                                src={path?.src}
                                alt='logo'
                                className={styles.logo}
                                width={500}
                                height={500}
                            />
                        </div>
                        <div className={styles.column}>
                            <p className={cn(styles.word, ArianAMU.className)}>{link.company_name}</p>
                            <p className={cn(styles.word, ArianAMU.className)}>{link.words}</p>
                        </div>
                        <div className={styles.icon}>
                            <GoProjectSymlink />
                        </div>
                    </div>
                </Link>
            </li>
        )
    });

    const toggleNavigation = () => setIsActive(!isActive);

    return (
        <div ref={componentRef} className={styles.float}>
            <div className={`${styles.navigation} ${isActive ? styles.active : ''}`} style={{ background: theme }}>
                <div className={styles['menu-toggle']} onClick={toggleNavigation}></div>
                <ul className={styles.menu}>
                    {links}
                </ul>
            </div>
        </div>

    );
};

export default FloatingMenu;