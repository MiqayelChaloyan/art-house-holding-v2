'use client'

import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import Snackbar from '@/src/components/components/snackbar';

import InputField from '@/src/lib/ui/InputField';
import InputNumber from '@/src/lib/ui/InputNumber';
import TextareaField from '@/src/lib/ui/TextareaField';

import { designFont } from '@/src/constants/font';
import { TRAINING_CENTERS } from '@/src/constants';

import { sendContactUsDesign } from '@/src/api';
import { ContactUsResponse } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    lessons: SELECT_OPTIONS_DESIGN_QUERYResult;
    lessonsArmenian: SELECT_OPTIONS_DESIGN_QUERYResult;
    selectedSlug?: string;
};

interface FormValues {
    full_name: string;
    email: string;
    phone: string;
    course_name: string;
    message: string;
};

const initValues: FormValues = {
    full_name: '',
    email: '',
    phone: '',
    course_name: '',
    message: '',
};

const OrderForm = ({ lessons, lessonsArmenian, selectedSlug }: Readonly<Props>) => {
    const t = useTranslations();
    const tPage = useTranslations('form-page');
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [course, setCourse] = useState('');
    const [values, setValues] = useState<FormValues>(initValues);
    const [info, setInfo] = useState({
        status: 'success',
        content: t('texts.send-message-success'),
    });

    const applyLesson = (lesson: LESSON) => {
        const armenian = lessonsArmenian?.course_name?.find((item) => String(item.slug) === String(lesson.slug));
        setValues((prev) => ({ ...prev, course_name: lesson.course_name }));
        setCourse(armenian?.course_name || lesson.course_name);
    };

    useEffect(() => {
        if (!selectedSlug) return;
        const query = selectedSlug.trim().toLowerCase();
        const list = lessons?.course_name || [];
        const lesson = list.find((item) => String(item.slug).toLowerCase() === query)
            || list.find((item) => item.course_name?.toLowerCase() === query)
            || list.find((item) => item.course_name?.toLowerCase().includes(query) || String(item.slug).toLowerCase().includes(query));
        if (lesson) applyLesson(lesson);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSlug, lessons, lessonsArmenian]);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!course) return;

        try {
            setIsLoading(true);

            const res: ContactUsResponse = await sendContactUsDesign({
                full_name: values.full_name,
                email: values.email,
                phone: values.phone,
                course_name: course,
                message: values.message,
                training_center: TRAINING_CENTERS.design_school,
            });

            if (res.status !== 200) {
                throw new Error('Failed to send message');
            }

            setOpen(true);
            setInfo({
                status: 'success',
                content: t('texts.send-message-success'),
            });
            setCourse('');
            setValues(initValues);
        } catch {
            setOpen(true);
            setInfo({
                status: 'info',
                content: t('texts.send-message-failure'),
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn(styles.panel, designFont.ui)}>
            <Snackbar open={open} handleChange={() => setOpen(false)} info={info} />
            <h2 className={cn(styles.title, designFont.serif)}>{tPage('title')}</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <InputField
                    className={styles.field}
                    name="full_name"
                    type="text"
                    placeholder={t('contact-us-form.full-name')}
                    requiredField
                    value={values.full_name}
                    onChange={handleChange}
                />
                <InputField
                    className={styles.field}
                    name="email"
                    type="email"
                    placeholder={t('contact-us-form.email')}
                    requiredField
                    value={values.email}
                    onChange={handleChange}
                />
                <InputNumber
                    className={styles.field}
                    name="phone"
                    type="tel"
                    placeholder={t('contact-us-form.phone-number')}
                    maskNumber="+374 99 99 99 99"
                    requiredField
                    value={values.phone}
                    onChange={handleChange}
                />
                <CourseSelect
                    lessons={lessons?.course_name || []}
                    value={values.course_name}
                    placeholder={t('contact-us-form.select-course')}
                    onSelect={applyLesson}
                />
                <TextareaField
                    className={styles.textarea}
                    name="message"
                    placeholder={t('contact-us-form.message')}
                    requiredField
                    value={values.message}
                    onChange={handleChange}
                />
                <button type="submit" className={styles.submit} disabled={isLoading}>
                    {isLoading ? `${t('contact-us-form.loading')}...` : t('contact-us-form.send')}
                </button>
            </form>
        </div>
    );
};

const CourseSelect = ({
    lessons,
    value,
    placeholder,
    onSelect,
}: {
    lessons: LESSON[];
    value: string;
    placeholder: string;
    onSelect: (lesson: LESSON) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onPointer = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsOpen(false);
        };

        document.addEventListener('mousedown', onPointer);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onPointer);
            document.removeEventListener('keydown', onKey);
        };
    }, []);

    return (
        <div ref={ref} className={cn(styles.select, isOpen && styles.selectOpen)}>
            <button
                type="button"
                className={cn(styles.selectButton, !value && styles.placeholder)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((current) => !current)}
            >
                <span className={styles.label}>{value || placeholder}</span>
                <span className={styles.arrow} aria-hidden />
            </button>
            <ul className={styles.dropdown} role="listbox">
                {lessons.map((lesson) => {
                    const selected = value === lesson.course_name;
                    return (
                        <li
                            key={String(lesson.slug)}
                            role="option"
                            aria-selected={selected}
                            className={cn(selected && styles.optionSelected)}
                            onClick={() => {
                                onSelect(lesson);
                                setIsOpen(false);
                            }}
                        >
                            {lesson.course_name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default React.memo(OrderForm);
