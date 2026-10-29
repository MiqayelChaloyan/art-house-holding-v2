'use client'

import Header from './Header';
import Portfolios from './Portfolios';


interface Props {
    courses: COURSES_DESIGN_QUERYResult[];
    data: PRICE_LIST_DESIGN_QUERYResult;
};

const Home = ({ courses, data }: Readonly<Props>) => (
    <div>
        <Header data={data} />
        <Portfolios courses={courses} />
    </div>
);

export default Home;