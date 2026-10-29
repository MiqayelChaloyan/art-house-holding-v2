'use client'

import Link from 'next/link';

import { Pages } from '@/src/constants/pages';
import { Arial } from '@/src/constants/font';

import { HiHome } from 'react-icons/hi2';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    theme: string;
    locale: string;
};

const GoBack = ({ theme, locale }: Readonly<Props>) => (
    <Link
        href={`/${locale}${Pages.HOME}`}
        aria-label={Pages.HOME}
        className={cn(styles.btn, styles['book-now'], Arial.className)}
        style={{ background: theme }}
    >
        <HiHome color={colors.white} size={30}/>
    </Link>
);

export default GoBack;