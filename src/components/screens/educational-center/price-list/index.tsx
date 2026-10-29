'use client'

import { useEffect } from 'react';

import { useTranslations } from 'next-intl';

import { useDispatch } from 'react-redux';
import { closeModal } from '@/src/store/modal_reducer';

import Container from '@/src/components/components/container';

import Accordion from './Accordion';

import { Inter } from '@/src/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
	data: COURSES_QUERYResult[];
};

const PriceList = ({ data }: Readonly<Props>) => {
	const t = useTranslations('sections');
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(closeModal(false)), 1);
    }, [data, dispatch]);

	return (
		<section id='price-list' className={styles.section}>
			<Container className='container'>
				<h1 className={cn(styles.title, Inter.className)}>
					{t('price-list')}
				</h1>
				<Accordion courses={data} />
			</Container>
		</section>
	);
};

export default PriceList;











