'use client'

import Portfolios from './Portfolios';


interface Props {
    courses: COURSES_DESIGN_QUERYResult[];
};

const Home = ({ courses }: Readonly<Props>) => (
    <Portfolios courses={courses} />
);

export default Home;
