'use client'

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';

import Fancybox from '@/src/components/components/fancybox';
import NextImage from '@/src/components/components/image';

import { options } from '@/src/components/components/fancybox/options';
import { InstrumentSerif, Inter, Montserrat } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';
import { urlForImage } from '@/sanity/imageUrlBuilder';
import { getPortfolioItemKey } from '@/src/utils/portfolio-item-key';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: COURSES_DESIGN_QUERYResult;
};

const Home = ({ data }: Readonly<Props>) => {
    const searchParams = useSearchParams();
    const first = data.portfolios?.[0];
    const [portfolio, setPortfolio] = useState<PORTFOLIO[]>(first ? [first] : []);

    useEffect(() => {
        let nameFromParams = getPortfolioItemKey(searchParams);

        if (!nameFromParams) {
            nameFromParams = localStorage.getItem('name');
        }

        if (!nameFromParams && data.portfolios?.length) {
            nameFromParams = data.portfolios[0]._key;
        }

        if (nameFromParams) {
            localStorage.setItem('name', nameFromParams);
        }

        const filtered = data.portfolios?.filter((item) => item._key === nameFromParams) || [];
        if (filtered.length) {
            setPortfolio(filtered);
        }
    }, [searchParams, data.portfolios]);

    const current = portfolio[0];
    if (!current) return null;

    const coverSource = current.background_image || current.image;
    const cover = coverSource ? urlForImage(coverSource, 1600) : undefined;

    return (
        <article className={cn(styles.page, Inter.className)} data-portfolio-page>
            <header className={styles.hero}>
                {cover?.src && (
                    <NextImage
                        src={cover.src}
                        alt={coverSource?.alt || current.author || data.course_name || ''}
                        className={styles.heroImage}
                        width={cover.width}
                        height={cover.height}
                        sizes="100vw"
                        priority
                    />
                )}
                <div className={styles.heroCopy}>
                    <h1 className={cn(styles.author, InstrumentSerif.className)}>{keepWords(current.author)}</h1>
                    <p className={cn(styles.course, Montserrat.className)}>{data.course_name}</p>
                </div>
            </header>

            {(current.title_images_array || []).map((works) => (
                <GalleryRow key={works._key} works={works} />
            ))}
        </article>
    );
};

const GalleryRow = ({ works }: { works: WORK }) => {
    const [emblaRef] = useEmblaCarousel({
        align: 'start',
        dragFree: true,
        containScroll: false,
    });
    const shots = (works.images || []).filter((image) => urlForImage(image, 900)?.src);

    if (!shots.length && !works.title) return null;

    return (
        <section className={styles.section}>
            {works.title && (
                <h2 className={cn(styles.sectionTitle, InstrumentSerif.className)}>{keepWords(works.title)}</h2>
            )}
            {shots.length > 0 && (
                <div className={styles.rail} ref={emblaRef}>
                    <Fancybox options={options}>
                        <div className={styles.track}>
                            {shots.map((image, index) => {
                                const path = urlForImage(image, 900);
                                if (!path?.src) return null;

                                return (
                                    <a
                                        key={image.asset?._ref || `${works._key}-${index}`}
                                        data-fancybox="gallery"
                                        href={path.src}
                                        className={styles.shot}
                                    >
                                        <NextImage
                                            src={path.src}
                                            alt={image.alt || works.title || ''}
                                            className={styles.shotImage}
                                            width={path.width}
                                            height={path.height}
                                            sizes="418px"
                                        />
                                    </a>
                                );
                            })}
                        </div>
                    </Fancybox>
                </div>
            )}
        </section>
    );
};

export default Home;
