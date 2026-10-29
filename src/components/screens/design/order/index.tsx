'use client'

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import WorksGallery from '@/src/components/components/worksGallery';

import HoneyCombLoader from '@/src/lib/ui/rotatingLines';
import { Arial } from '@/src/constants/font';

import { urlForImage } from '@/sanity/imageUrlBuilder';
import { ImagePath } from '@/src/types/general';
import { getPortfolioItemKey } from '@/src/utils/portfolio-item-key';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: COURSES_DESIGN_QUERYResult;
};

const Home = ({ data }: Readonly<Props>) => {
    const searchParams = useSearchParams();
    const [path, setPath] = useState<ImagePath | null>(null);
    const [order, setOrder] = useState<ORDER[]>([]);

    useEffect(() => {
        let nameFromParams = getPortfolioItemKey(searchParams);

        if (!nameFromParams) {
            nameFromParams = localStorage.getItem('name');
        }

        if (!nameFromParams && data.orders?.length) {
            nameFromParams = data.orders[0]._key;
        }

        if (nameFromParams) {
            localStorage.setItem('name', nameFromParams);
        }

        const filteredOrder = data.orders?.filter((item: PORTFOLIO) => item._key === nameFromParams) || [];
        setOrder(filteredOrder);


        if (filteredOrder.length > 0) {
            const imagePath = urlForImage(filteredOrder[0]?.background_image);
            setPath(imagePath);
        }

    }, [searchParams, data.orders]);

    if (order.length === 0) {
        return (
            <div className={styles.loader}>
                <HoneyCombLoader />
            </div>
        );
    }

    const { author } = order[0];


    return (
        <div>
            <div className={styles.article} style={{ backgroundImage: `url(${path?.src})` }} >
                <div className={styles.titles}>
                    <h1 className={cn(styles.course_name, Arial.className)}>{data.course_name}</h1>
                    <h2 className={cn(styles.author, Arial.className)}>{author}</h2>
                </div>
            </div>
            {order[0]?.title_images_array.map((works: WORK) => (
                <WorksGallery key={works._key} works={works} />
            ))}
        </div>
    )
};

export default Home;