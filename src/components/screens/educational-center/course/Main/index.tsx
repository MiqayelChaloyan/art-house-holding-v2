'use client'

import React from 'react';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';

import SlideItem from './SlideItem';

import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import styles from './styles.module.sass';


interface Props {
	course: COURSE_MAIN[];
};

const Main = ({ course }: Readonly<Props>) => {
	const options: EmblaOptionsType = { loop: true, duration: 30, align: 'center',};
	const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);

	const slidesItems = course?.map((item: COURSE_MAIN, index: number) => {
		const path: ImagePath = urlForImage(item.image);

		return (
			<SlideItem
				key={item._key || index}
				url={path?.src}
				title={item.title}
			/>
		);
	});


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
