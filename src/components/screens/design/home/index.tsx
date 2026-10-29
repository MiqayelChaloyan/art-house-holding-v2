'use client'

import React from 'react';

import Main from './Main';
import Courses from './Courses';
import OurDay from './OurDay';
import OurTeam from './OurTeam';
import Partners from './Partners';
import Progress from './Progress';


interface Props {
    data: HOME_DETALIS_DESIGN_QUERYResult;
    partners: PARTNER_Result[];
};

const Home = ({ data, partners }: Readonly<Props>) => (
    <>
        <Main data={data.main_section} />
        <Courses courses={data.courses} />
        <OurDay our_day={data.our_day} />
        <Progress data={data.progress_section} />
        <OurTeam data={data.workers}/>
        <Partners data={partners}/>
    </>
);

export default React.memo(Home);