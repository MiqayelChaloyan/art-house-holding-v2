'use client'

import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';
import { MdAccessTimeFilled, MdEmail, MdLocalPhone, MdLocationOn } from 'react-icons/md';

import Snackbar from '@/src/components/components/snackbar';

import InputField from '@/src/lib/ui/InputField';
import InputNumber from '@/src/lib/ui/InputNumber';

import { InstrumentSerif, Inter } from '@/src/constants/font';
import { TRAINING_CENTERS } from '@/src/constants';

import { sendContactUsDesign } from '@/src/api';
import { ContactUsResponse } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    lessons: SELECT_OPTIONS_DESIGN_QUERYResult;
    lessonsArmenian: SELECT_OPTIONS_DESIGN_QUERYResult;
    contacts: CONTACT_US_DESIGN_QUERYResult;
};

interface FormValues {
    name: string;
    surname: string;
    phone: string;
    course_name: string;
};

const formatPhone = (value: string) => {
    const digits = value.replace(/\s/g, '');
    if (digits.startsWith('+374') && digits.length > 4) {
        return `+374 ${digits.slice(4)}`;
    }
    return value;
};

const initValues: FormValues = {
    name: '',
    surname: '',
    phone: '',
    course_name: '',
};

const Contact = ({ lessons, lessonsArmenian, contacts }: Readonly<Props>) => {
    const t = useTranslations();
    const tPage = useTranslations('contact-page');

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [course, setCourse] = useState('');
    const [values, setValues] = useState<FormValues>(initValues);
    const [info, setInfo] = useState({
        status: 'success',
        content: t('texts.send-message-success'),
    });

    const phones = (contacts?.phone_numbers || []).filter(Boolean);
    const hours = contacts?.hours || '';
    const email = contacts?.email;
    const address = contacts?.address || '';
    const mapsQuery = encodeURIComponent(address);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleCourse = (lesson: LESSON) => {
        setValues((prev) => ({ ...prev, course_name: lesson.course_name }));
        const armenian = lessonsArmenian?.course_name?.find((item) => String(item.slug) === String(lesson.slug));
        setCourse(armenian?.course_name || lesson.course_name);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!course) return;

        const fullName = `${values.name} ${values.surname}`.trim();

        try {
            setIsLoading(true);

            const formData = {
                full_name: fullName,
                first_name: values.name,
                last_name: values.surname,
                email: '',
                phone: values.phone,
                course_name: course,
                training_center: TRAINING_CENTERS.design_school,
            };

            const res: ContactUsResponse = await sendContactUsDesign(formData);

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
        <section id="contact" className={cn(styles.section, Inter.className)}>
            <Snackbar open={open} handleChange={() => setOpen(false)} info={info} />
            <div className={styles.wrap}>
                <div className={styles.grid}>
                    <div className={styles.info}>
                        <p className={styles.eyebrow}>
                            <span className={styles.mark} aria-hidden />
                            {tPage('eyebrow')}
                        </p>
                        <h1 className={cn(styles.headline, InstrumentSerif.className)}>
                            <span>{tPage('line-1')}</span>
                            <span className={styles.emphasis}>{tPage('line-2')}</span>
                        </h1>
                        <ul className={styles.details}>
                            {phones.map((number) => (
                                <li key={number}>
                                    <MdLocalPhone aria-hidden />
                                    <a href={`tel:${number.replace(/\s/g, '')}`}>{formatPhone(number)}</a>
                                </li>
                            ))}
                            {hours && (
                                <li>
                                    <MdAccessTimeFilled aria-hidden />
                                    <span>{hours}</span>
                                </li>
                            )}
                            {email && (
                                <li>
                                    <MdEmail aria-hidden />
                                    <a href={`mailto:${email}`}>{email}</a>
                                </li>
                            )}
                            {address && (
                                <li>
                                    <MdLocationOn aria-hidden />
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {address}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className={styles.panel}>
                        <h2 className={cn(styles.feedback, InstrumentSerif.className)}>{tPage('feedback')}</h2>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <InputField
                                className={styles.field}
                                name="name"
                                type="text"
                                placeholder={t('contact-us-form.name')}
                                requiredField
                                value={values.name}
                                onChange={handleChange}
                            />
                            <InputField
                                className={styles.field}
                                name="surname"
                                type="text"
                                placeholder={tPage('surname')}
                                requiredField
                                value={values.surname}
                                onChange={handleChange}
                            />
                            <InputNumber
                                className={styles.field}
                                name="phone"
                                type="tel"
                                placeholder={tPage('phone')}
                                maskNumber="+374 99 99 99 99"
                                requiredField
                                value={values.phone}
                                onChange={handleChange}
                            />
                            <CourseSelect
                                lessons={lessons?.course_name || []}
                                value={values.course_name}
                                placeholder={tPage('choose-course')}
                                onSelect={handleCourse}
                            />
                            <button type="submit" className={styles.submit} disabled={isLoading}>
                                {isLoading ? `${t('contact-us-form.loading')}...` : t('contact-us-form.send')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
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

        document.addEventListener('mousedown', onPointer);
        return () => document.removeEventListener('mousedown', onPointer);
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
                <span>{value || placeholder}</span>
                <span className={styles.arrow} aria-hidden />
            </button>
            <ul className={styles.dropdown} role="listbox">
                {lessons.map((lesson) => (
                    <li key={String(lesson.slug)}>
                        <button
                            type="button"
                            onClick={() => {
                                onSelect(lesson);
                                setIsOpen(false);
                            }}
                        >
                            {lesson.course_name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default React.memo(Contact);
