'use client'

import React from 'react';

import Panel from './Panel';
import PrivateLessons from './PrivateLessons';
import EnglishLanguageClasses from './EnglishLanguageClasses';

import styles from './styles.module.sass';


interface Props {
    data: PRICE_LIST_LANGUAGE_QUERYResult;
};

const Home = ({ data }: Readonly<Props>) => {
    return (
        <section id='price-list' className={styles.container}>
            <Panel data={data.price_list} />
            <PrivateLessons data={data.private_lessons} />
            <EnglishLanguageClasses data={data.english_courses} />
        </section>
    );
}

export default React.memo(Home);