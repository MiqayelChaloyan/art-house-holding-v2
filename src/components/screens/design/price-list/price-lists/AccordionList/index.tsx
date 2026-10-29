'use client'

import { useRef, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import { useTranslations } from 'next-intl';

import { Arial } from '@/src/constants/font';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: PRICES[];
};

interface AccordionItemProps {
    handleToggle: (id: number) => void;
    active: number | null;
    course: COURSE;
};

const AccordionItem = ({
    handleToggle,
    active,
    course
}: Readonly<AccordionItemProps>) => {
    const contentEl = useRef<HTMLDivElement>(null);
    const t = useTranslations('tables-titles');

    const {
        group_lessons,
        personal_lessons,
        duration,
        hours_lessons,
        _key: id,
        course: course_name,
    } = course;

    return (
        <div className={cn(styles['accordion-card'], active === id ? styles.active : '')}>
            <div
                onClick={() => handleToggle(id)}
                className={cn(styles['accordion-toggle'], active === id ? styles.active : '')}
            >
                <div>
                    <h5 className={cn(styles['accordion-title'], Arial.className)}>{course_name}</h5>
                </div>
                <div>
                    <RiArrowDownSLine className={styles['accordion-icon']} size={20} color={colors.white} />
                </div>
            </div>
            <div
                ref={contentEl}
                className={cn(styles['collapse'], active === id ? styles.show : '')}
                style={
                    active === id && contentEl.current
                        ? { height: contentEl.current.scrollHeight }
                        : { height: 0 }
                }>
                <div className={styles['accordion-body']}>
                    <div className={cn(styles.table, Arial.className)}>
                        <table>
                            <thead>
                                <tr>
                                    <th rowSpan={1} colSpan={1}>{t('group')}</th>
                                    <th rowSpan={1} colSpan={1}>{t('individual')}</th>
                                    <th rowSpan={1} colSpan={1}>{t('duration-all')}</th>
                                    <th rowSpan={1} colSpan={1}>{t('hours-all')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{group_lessons}</td>
                                    <td>{personal_lessons}</td>
                                    <td>{duration}</td>
                                    <td>{hours_lessons}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AccordionList = ({ data }: Readonly<Props>) => {
    const [active, setActive] = useState<number>(0);

    const handleToggle = (index: number) => {
        if (active === index) {
            setActive(0);
        } else {
            setActive(index);
        }
    };

    return (
        <div className={styles.cards}>
            {data?.map((course: any) => (
                <AccordionItem
                    key={course._key}
                    active={active}
                    handleToggle={handleToggle}
                    course={course}
                />
            ))}
        </div>
    );
};

export default AccordionList;
