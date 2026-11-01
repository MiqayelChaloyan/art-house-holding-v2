'use client'

import Portfolios from './Portfolios';


interface Props {
    courses: COURSES_DESIGN_QUERYResult[];
    page?: PORTFOLIO_PAGE_DESIGN_QUERYResult | null;
};

const Home = ({ courses, page }: Readonly<Props>) => (
    <Portfolios courses={courses} page={page} />
);

export default Home;
