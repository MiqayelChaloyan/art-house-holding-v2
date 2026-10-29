'use client'

import React from 'react';

import Link from 'next/link';

import { usePathname } from 'next/navigation'

import { useDispatch } from 'react-redux';
import { openModal } from '@/src/store/modal_reducer';

import Home from '@/src/lib/icons/educational-center/Home';
import Courses from '@/src/lib/icons/educational-center/Courses';
import PriceList from '@/src/lib/icons/educational-center/PriceList';
import CoWorkers from '@/src/lib/icons/educational-center/CoWorkers';
import Contact from '@/src/lib/icons/educational-center/Contact';

import { Pages } from '@/src/constants/pages';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
	socialData: CONTACT_US_QUERYResult;
	locale: string;
};

const BottomMenu = ({
	locale,
	socialData
}: Props) => {
	const tel = 'tel:' + socialData?.phone_number.replace(/\s/g, '');
	const dispatch = useDispatch();
	const pathname = usePathname();

	return (
		<div className={styles.nav_menu}>
			<div className={styles.nav_list}>
				<Link
					className={cn(pathname === `/${locale}${Pages.EDUCATIONAL_HOME}` && styles.linkActive, styles.nav__link)}
					href={`/${locale}${Pages.EDUCATIONAL_HOME}`}
					aria-label='Home'
					title='Home'
				>
					<Home width={22} height={22} fill={colors.white} />
				</Link>
				<button
					className={styles.nav__link}
					onClick={() => setTimeout(() => dispatch(openModal(true)), 500)}
					title='Courses'
				>
					<Courses width={22} height={22} fill={colors.white} />
				</button>
				<Link
					className={cn(pathname === `/${locale}${Pages.EDUCATIONAL_PRICE_LIST}` && styles.linkActive, styles.nav__link)}
					href={`/${locale}${Pages.EDUCATIONAL_PRICE_LIST}`}
					aria-label='Price List'
					title='Price List'
				>
					<PriceList width={22} height={22} fill={colors.white} />
				</Link>
				<Link
					className={cn(pathname === `/${locale}${Pages.EDUCATIONAL_PARTNERS}` && styles.linkActive, styles.nav__link)}
					href={`/${locale}${Pages.EDUCATIONAL_PARTNERS}`}
					aria-label='Partners'
					title='Partners'
				>
					<CoWorkers width={25} height={22} fill={colors.white} />
				</Link>
				<Link
					className={styles.nav__link}
					href={tel}
					aria-label='Contact us'
					title='Contact us'
				>
					<Contact width={22} height={22} fill={colors.white} />
				</Link>
			</div>
		</div>
	);
};

export default BottomMenu;