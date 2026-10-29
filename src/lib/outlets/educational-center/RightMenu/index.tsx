'use client'

import React from 'react';

import Link from 'next/link';

import Home from '@/src/lib/icons/educational-center/Home';
import Courses from '@/src/lib/icons/educational-center//Courses';
import PriceList from '@/src/lib/icons/educational-center//PriceList';
import CoWorkers from '@/src/lib/icons/educational-center//CoWorkers';
import Contact from '@/src/lib/icons/educational-center//Contact';

import { Pages } from '@/src/constants/pages';
import { useDispatch } from 'react-redux';
import { openModal } from '@/src/store/modal_reducer';

import colors from '@/src/themes';

import styles from './styles.module.sass';


interface Props {
	socialData: CONTACT_US_QUERYResult;
	locale: string;
};

const RightMenu = ({ locale, socialData }: Props) => {
	const tel = 'tel:' + socialData?.phone_number.replace(/\s/g, '');
	const dispatch = useDispatch();

	return (
		<div className={styles.nav_menu}>
			<div className={styles.nav_list}>
				<Link
					className={styles.btn_home}
					href={`/${locale}${Pages.EDUCATIONAL_HOME}`}
					aria-label={Pages.EDUCATIONAL_HOME}
					title='Home'
				>
					<Home width={20} height={20} fill={colors.white} />
				</Link>
				<button
					className={styles.btn_courses}
					onClick={() => setTimeout(() => dispatch(openModal(true)), 500)}
					title='Courses'
				>
					<Courses width={20} height={20} fill={colors.white} />
				</button>
				<Link
					className={styles.btn_price_list}
					href={`/${locale}${Pages.EDUCATIONAL_PRICE_LIST}`}
					aria-label={Pages.EDUCATIONAL_PRICE_LIST}
					title='Price List'
				>
					<PriceList width={20} height={20} fill={colors.white} />
				</Link>
				<Link
					className={styles.btn_co_worker}
					href={`/${locale}${Pages.EDUCATIONAL_PARTNERS}`}
					aria-label={Pages.EDUCATIONAL_PARTNERS}
					title='Co Worker'
				>
					<CoWorkers width={25} height={20} fill={colors.white} />
				</Link>
				<Link
					className={styles.btn_contact_us}
					href={tel}
					aria-label='Contact us'
					title='Contact us'
				>
					<Contact width={20} height={20} fill={colors.white} />
				</Link>
			</div>
		</div>
	);
};

export default RightMenu;