'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import NextImage from '@/src/components/components/image';

import useWindowSize from '@/src/hooks/useWindowSize';

import AccordionArrow from '@/src/lib/icons/educational-center/AccordionArrow';
import { Arial } from '@/src/constants/font';

import { Image, ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface PanelProps {
    name: string;
    list: PRICE_LIST[];
    svg: Image;
    alt?: string;
    activeTab?: any;
    index: any;
    activateTab: () => void;
};

const Panel = ({ name, list, svg, alt, activeTab, index, activateTab }: Readonly<PanelProps>) => {
    const size = useWindowSize();
    const t = useTranslations('price-list');
    const pathSvg: ImagePath = urlForImage(svg);

    const innerStyle = { height: activeTab === index ? 'max-content' : '0px' };

    const table = list?.map((item: PRICE_LIST) => (
        <table key={item?._key} className={Arial.className}>
            <thead>
                <tr>
                    <td>{item?.course_title}</td>
                    <td>{item?.amount} AMD</td>
                    <td>{item?.duration}</td>
                    <td>{`${item?.duration_of_class} ${t('hour')}`}</td>
                </tr>
            </thead>
        </table>
    ));

    return (
        <div
            className={styles.panel}
            role='tabpanel'
            id={`panel-${index}`}
        >
            <div className={styles.panel_box}>
                <div className={styles.column}>
                    <p className={cn(styles.panel__label, Arial.className)} role='tab'>
                        {name}
                    </p>
                    <button
                        onClick={activateTab}
                        style={{ transform: activeTab !== index ? 'rotate(178deg)' : 'rotate(0deg)' }}
                        className={styles.button_tab}
                        aria-expanded={activeTab === index}
                    >
                        <AccordionArrow
                            width={size.width <= 767 ? 25 : 50}
                            height={size.width  <= 767 ? 25 : 50}
                            fill={colors.white}
                        />
                    </button>
                </div>
                <div>
                    <NextImage
                        src={pathSvg?.src}
                        alt={alt ?? name}
                        className={styles.svg_icon}
                        width={pathSvg?.width ?? 80}
                        height={pathSvg?.height ?? 80}
                    />
                </div>
            </div>
            <div
                className={styles.panel__inner}
                style={innerStyle}
                aria-hidden={activeTab !== index}
            >
                <div className={styles.panel__content}>
                    {table}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Panel);