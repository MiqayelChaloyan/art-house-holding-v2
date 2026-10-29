'use client'

import React from 'react';

import Container from '@/src/components/components/container';
import { Course, CourseMobileCard, Gallery } from '../Course';

import styles from './styles.module.sass';


interface Props {
    data: LESSON[];
};

const Courses = ({ data }: Readonly<Props>) => {
    return (
        <>
            <div className={styles['mobile-column']}>
                {data?.map((course: LESSON) => (
                    <CourseMobileCard key={course._key} course={course} />
                ))}
            </div>
            <Container className='container'>
                <div className={styles.column}>
                    {data?.map((course: LESSON) => (
                        <div className={styles.row} key={course._key}>
                            <Course course={course} />
                            <Gallery course={course} />
                        </div>
                    ))}
                </div>
            </Container>
        </>
    );
};

export default React.memo(Courses);