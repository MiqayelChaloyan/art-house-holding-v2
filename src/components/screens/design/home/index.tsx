'use client'

import React from 'react';

import Main from './Main';
import Studio from './Studio';
import Courses from './Courses';
import Why from './Why';
import Projects from './Projects';
import Staff from './Staff';
import Certificates from './Certificates';
import Voices from './Voices';
import Partners from './Partners';


interface Props {
    data: HOME_DETALIS_DESIGN_QUERYResult;
};

const Home = ({ data }: Readonly<Props>) => (
    <>
        <Main data={data.main_section} />
        <Studio section={data.studio_section} fallbackSlides={data.main_section} />
        <Courses courses={data.courses} section={data.courses_section} />
        <Why section={data.why_section} />
        <Staff workers={data.workers} section={data.staff_section} />
        <Certificates section={data.certificates_section} />
        <Projects section={data.projects_section} />
        <Voices section={data.voices_section} />
        <Partners clients={data.clients} />
    </>
);

export default React.memo(Home);