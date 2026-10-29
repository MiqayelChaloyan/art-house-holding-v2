'use client'

import React from 'react';

import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import styles from './styles.module.sass';


interface Props {
    data: any;
};

const Header = ({ data }: Readonly<Props>) => {
    const path: ImagePath = urlForImage(data.image);

    return (<div className={styles.article} style={{ backgroundImage: `url(${path?.src})` }} />);
};

export default Header;
