'use client';

import React from 'react';

import TeacherWithWorksImages from './TeacherWithWorksImages';

import { MdOutlineArrowForwardIos, MdOutlineArrowBackIosNew } from 'react-icons/md';

import { motion } from 'framer-motion';

import { Swiper, SwiperSlide } from 'swiper/react';
import { swiperOptions } from './options';

import './styles.css';


interface Props {
    data: SPECIALIST[];
};

const TeacherWithWorks = ({ data }: Readonly<Props>) => {
    const items = data?.map((specialist: SPECIALIST) => (
        <SwiperSlide key={specialist._key}>
            {({ isActive }) => (
                <motion.div initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.5,
                    }}
                >
                    <TeacherWithWorksImages specialist={specialist} />
                </motion.div>
            )}
        </SwiperSlide>
    ));

    return (
        <div>
            <Swiper {...swiperOptions} >
                {items}
                <div className='swiper-button-next'>
                    <MdOutlineArrowForwardIos size={70} fill='gray' />
                </div>
                <div className='swiper-button-prev'>
                    <MdOutlineArrowBackIosNew size={70} fill='gray' />
                </div>
            </Swiper>
        </div>
    )
};

export default React.memo(TeacherWithWorks);
