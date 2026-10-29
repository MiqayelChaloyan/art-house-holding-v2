'use client'

import { useEffect } from 'react';

import { useTranslations } from 'next-intl';

import { useDispatch } from 'react-redux';
import { closeModal } from '@/src/store/modal_reducer';

import Container from '@/src/components/components/container';
import NextImage from '@/src/components/components/image';

import { Arial, Inter } from '@/src/constants/font';

import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
	data: PARTNER_Result[];
};

const Partners = ({ data }: Props) => {
	const t = useTranslations('sections');
	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => dispatch(closeModal(false)), 1);
	}, [data, dispatch]);

	const partners = data?.map((item: PARTNER_Result) => {
		const path: ImagePath = urlForImage(item?.logo);

		return (
			<div key={item._id} className={styles.partner}>
				<div className={styles.image_container}>
					<NextImage
						src={path?.src}
						alt={item?.logo.alt}
						className={styles.image}
						width={500}
						height={500}
						style={{ objectFit: 'cover' }}
					/>
				</div>
				<p className={cn(styles.text, Arial.className)}>{item?.company_name}</p>
				<p className={cn(styles.text, Arial.className)}>{item?.cooperation}</p>
				<p className={cn(styles.text, Arial.className)}>{item?.implemented_projects}</p>
			</div>
		);
	});

	return (
		<section id='partners' className={styles.container}>
			<Container className='container'>
				<h1 className={cn(styles.title, Inter.className)}>
					{t('partners')}
				</h1>
				<div className={styles.partners}>
					{partners}
				</div>
			</Container>
		</section>
	);
};

export default Partners;