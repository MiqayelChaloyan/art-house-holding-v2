'use client'

import Fancybox from '@/src/components/components/fancybox';
import WorkImage from './workImage';

import { options } from '@/src/components/components/fancybox/options';

import { Arial } from '@/src/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    works: any
};

const WorksGallery = ({ works }: Readonly<Props>) => {
    const gallery = works?.images.map((image: any) =>
        <WorkImage key={image._key} image={image} />);

    return (
        <div className={styles.works}>
            <h3 className={cn(styles.title, Arial.className)}>
                {works.title}
            </h3>
            <div className={styles.gallery}>
                <Fancybox options={options}>
                    {gallery}
                </Fancybox>
            </div>
        </div>
    )
};

export default WorksGallery;