'use client'

import React, { useState } from 'react';

import Panel from '../AccordionItem';

import styles from './styles.module.sass';


interface Props {
    courses: COURSES_QUERYResult[];
};

const Accordion = ({ courses }: Props) => {
    const [activeTab, setActiveTab] = useState<number | null>(null);

    const activateTab = (index: number) => setActiveTab((prev) => (prev === index ? -1 : index));

    return (
        <div className={styles.accordion} role='tablist'>
            {courses?.map((panel, index) => (
                <Panel
                    key={panel._id}
                    activeTab={activeTab}
                    index={index}
                    name={panel.course_name}
                    svg={panel.svg}
                    alt={panel.svg.alt}
                    list={panel.price_list}
                    activateTab={() => activateTab(index)}
                />
            ))}
        </div>
    );
};

export default React.memo(Accordion);