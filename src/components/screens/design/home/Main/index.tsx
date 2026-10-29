'use client'

import React, { useMemo } from 'react';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';

import SlideItem from './SlideItem';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import { ImagePath } from '@/src/types/general';

import styles from './styles.module.sass';


interface Props {
	data: MAIN_SLIDE[];
};

const Main = ({ data }: Readonly<Props>) => {
	const options: EmblaOptionsType = { loop: true, align: 'center',};
	const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);

	const slidesItems = useMemo(() => {
		return data?.map((item: MAIN_SLIDE) => {
			const path: ImagePath = urlForImage(item.image);

			return (
				<SlideItem
					key={item._key}
					url={path?.src}
					company_name={item.company_name}
					title={item.title}
				/>
			);
		});
	}, [data]);

	return (
		<section id='main' className={styles.screen}>
			<div className={styles.main}>
				<div className={styles.emplay} ref={emblaRef}>
					<div className={styles.emplay_container}>
						{slidesItems}
					</div>
				</div>
			</div>
		</section>
	);
};

export default React.memo(Main);
