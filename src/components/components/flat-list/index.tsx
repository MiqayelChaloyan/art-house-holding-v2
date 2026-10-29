import { Swiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

interface FlatListProps {
    list: JSX.Element[];
};

const FlatList = ({ list }: Readonly<FlatListProps>) => (
    <Swiper
        watchSlidesProgress={true}
        slidesPerView={2.2}
        spaceBetween={5}
        effect={'cards'}
        className='mySwiper'
    >
        {list}
    </Swiper>
);

export default FlatList;