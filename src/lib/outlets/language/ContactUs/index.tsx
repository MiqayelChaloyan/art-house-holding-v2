'use client'

import { FormEvent, memo, useState } from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import Container from '@/src/components/components/container';
import Snackbar from '@/src/components/components/snackbar';

import Gmail from '@/src/lib/icons/language/Gmail';
import Instagram from '@/src/lib/icons/language/Instagram';
import Facebook from '@/src/lib/icons/language/Facebook';

import Select from '@/src/lib/ui/select';
import InputField from '@/src/lib/ui/InputField';
import InputNumber from '@/src/lib/ui/InputNumber';

import { Arial, Vrdznagir } from '@/src/constants/font';

import useWindowSize from '@/src/hooks/useWindowSize';

import { sendContactUsLanguage } from '@/src/api';
import { FormSmall, socialNetwork } from '@/src/types/language';
import { ResponseType } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    courses: SELECT_OPTIONS_LANGUAGE_QUERYResult[];
    languages: COURSES[] | any;
    socialData: CONTACT_US_LANGUAGE_QUERYResult;
};

interface FormProps {
    isLoading: boolean;
    error: boolean;
    values: FormSmall;
};

const socialNetworkComponents: socialNetwork = {
    facebook: Facebook,
    instagram: Instagram,
    gmail: Gmail,
};

const ContactUs = ({ courses, languages, socialData }: Props) => {
    const t = useTranslations();
    const pathname = usePathname();
    const [course, setCourse] = useState<string>('');
    const isOpen = pathname?.includes('/form')
    const [open, setOpen] = useState(false);
    const windowSize = useWindowSize();
    const [info, setInfo] = useState({
        status: 'success',
        content: t('texts.send-message-success')
    });

    const hosts = socialData?.social_links.map((host: SOCIAL_LINK) => {
        const socialName = host?.social_name.toLowerCase();
        const link = socialName === 'gmail' ? `mailto:${host?.social_link}` : host?.social_link;
        const SocialIcon = (socialNetworkComponents as any)[socialName];
        if (!SocialIcon) return null;

        return (
            <Link
                key={host._key}
                href={link}
                aria-label={host?.social_name}
                className={styles.social_network}
                target="_blank"
            >
                <SocialIcon
                    width={windowSize.width <= 1024 ? 20 : 30}
                    height={windowSize.width <= 1024 ? 20 : 30}
                    fill=''
                />
            </Link>
        )
    });

    const initValues = { full_name: '', email: '', phone: '', course_name: t('contact-us-form.select-course'), training_center: 44, };
    const initState = { isLoading: false, error: false, values: initValues };

    const [state, setState] = useState<FormProps>(initState);
    const { values, isLoading } = state;


    const handleChange = ({ target }: any) =>
        setState((prev: FormProps) => ({
            ...prev,
            values: {
                ...prev.values,
                [target.name]: target.value,
            },
        }));

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            full_name: state.values.full_name,
            email: state.values.email,
            phone: state.values.phone,
            course_name: course,
            training_center: 44,
        };

        try {
            if (formData.course_name !== t('contact-us-form.select-course')) {
                setState((prev: FormProps) => ({
                    ...prev,
                    isLoading: true,
                }))
            };

            const res: ResponseType = await sendContactUsLanguage(formData);

            if (res?.status !== 200) {
                setOpen(true);
                setInfo({
                    status: 'info',
                    content: t('texts.send-message-failure')
                });
                setState((prev: FormProps) => ({
                    ...prev,
                    isLoading: false,
                }))
                return;
            };


            setOpen(true);

            setInfo({
                status: 'success',
                content: t('texts.send-message-success')
            });

            setState(() => ({
                ...initState,
                isLoading: false,
                error: false,
            }));
        } catch (error: any) {
            setState((prev: FormProps) => ({
                ...prev,
                isLoading: false,
                error: true,
            }));

            setOpen(true);
            setInfo({
                status: 'info',
                content: t('texts.send-message-failure')
            });
        }
    };

    const handleClose = () => setOpen(false);

    const getValueToSlug = (valueName: string, slug: number) => {
        const course = valueName === 'course_name' && languages.course_name.find((item: { course_name: string, slug: number }) => {
            return item.slug === slug;
        });

        if (course.course_name) {
            return setCourse(course.course_name);
        }
    };

    return !isOpen && (
        <div className={styles.container}>
            <Snackbar open={open} handleChange={handleClose} info={info} />
            <Container className='container'>
                <div className={styles.contact}>
                    <div className={styles.box}>
                        <h1 className={cn(styles.title, Vrdznagir.className)}>
                            {t('texts.contact-us')}
                        </h1>
                        <div className={styles.connection} />
                    </div>
                    <div className={styles.contact_us}>
                        <div className={styles.hosts}>
                            {hosts}
                        </div>
                        <div className={styles.form}>
                            <form
                                className={styles.box}
                                onSubmit={handleSubmit}
                            >
                                <h2 className={cn(styles.form_title, Arial.className)}>
                                    {t('contact-us-form.form-title-language')}
                                </h2>
                                <div className={styles.fields}>
                                    <InputField
                                        className={cn(styles.input, Arial.className)}
                                        name='full_name'
                                        type='name'
                                        placeholder={t('contact-us-form.full-name')}
                                        requiredField={true}
                                        value={values.full_name}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        className={cn(styles.input, Arial.className)}
                                        name='email'
                                        type='email'
                                        placeholder={t('contact-us-form.email')}
                                        requiredField={true}
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                    <InputNumber
                                        className={cn(styles.input, Arial.className)}
                                        name='phone'
                                        type='phone'
                                        placeholder={t('contact-us-form.phone-number')}
                                        maskNumber='+374 99 99 99 99'
                                        requiredField={true}
                                        value={values.phone}
                                        onChange={handleChange}
                                    />
                                    <Select
                                        data={courses}
                                        valueName='course_name'
                                        handleChange={setState}
                                        state={state}
                                        classNameProperty='large'
                                        isClear={false}
                                        getValueToSlug={getValueToSlug}
                                    />
                                </div>
                                <button type='submit' className={styles.submit}>
                                    {isLoading ?
                                        <span className={Arial.className}>
                                            {`${t('contact-us-form.loading')}...`}
                                        </span>
                                        :
                                        <span className={Arial.className}>
                                            {t('contact-us-form.send')}
                                        </span>
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default memo(ContactUs);