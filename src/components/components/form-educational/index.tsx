'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react';

import { useTranslations } from 'next-intl';

import Link from 'next/link';

import Snackbar from '@/src/components/components/snackbar';

import useWindowSize from '@/src/hooks/useWindowSize';

import InputField from '@/src/lib/ui/InputField';
import InputNumber from '@/src/lib/ui/InputNumber';
import Select from '@/src/lib/ui/select';
import { Arial } from '@/src/constants/font';
import { TRAINING_CENTERS } from '@/src/constants';

import Instagram from '@/src/lib/icons/educational-center/Instagram';
import Gmail from '@/src/lib/icons/educational-center/Gmail';
import Facebook from '@/src/lib/icons/educational-center/Facebook';
import Linkedin from '@/src/lib/icons/educational-center/Linkedin';
import X from '@/src/lib/icons/educational-center/X';
import Tiktok from '@/src/lib/icons/educational-center/Tiktok';
import Telegram from '@/src/lib/icons/educational-center/Telegram';
import YouTube from '@/src/lib/icons/educational-center/YouTube';
import Pinterest from '@/src/lib/icons/educational-center/Pinterest';
import WhatsApp from '@/src/lib/icons/educational-center/WhatsApp';
import Viber from '@/src/lib/icons/educational-center/Viber';

import { sendContactUsEducational } from '@/src/api';

import { Form } from '@/src/types/educational-center';
import { ContactUsResponse, socialNetwork } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
	lessons: LESSON[];
	lessonsArmenian: LESSON[];
	social_links: SOCIAL_LINK[];
	theme: string;
};

interface FormProps {
	isLoading: boolean;
	error: boolean;
	values: Form;
};

const socialNetworkComponents: socialNetwork = {
	facebook: Facebook,
	instagram: Instagram,
	gmail: Gmail,
	linkedin: Linkedin,
	x: X,
	tiktok: Tiktok,
	telegram: Telegram,
	youtube: YouTube,
	pinterest: Pinterest,
	whatsapp: WhatsApp,
	viber: Viber
};

const FormAppointment = ({
	social_links,
	lessons,
	lessonsArmenian,
	theme
}: Readonly<Props>) => {
	const [course, setCourse] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const windowSize = useWindowSize();
	const t = useTranslations();

	const [info, setInfo] = useState({
		status: 'success',
		content: t('texts.send-message-success')
	});


	const hosts = social_links?.map((host: SOCIAL_LINK) => {
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
				target='_blank'
			>
				<SocialIcon
					width={windowSize.width <= 1024 ? 18 : 23}
					height={windowSize.width <= 1024 ? 18 : 23}
					fill={theme}
				/>
			</Link>
		)
	});

	const initValues = {
		full_name: '',
		email: '',
		phone: '',
		training_center: TRAINING_CENTERS.educational_school,
		course_name: t('contact-us-form.select-course')
	};

	const initState = { isLoading: false, error: false, values: initValues };

	const [state, setState] = useState<FormProps>(initState);
	const { values, isLoading } = state;

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { target } = event;

        setState((prev: FormProps) => ({
            ...prev,
            values: {
                ...prev.values,
                [target.name]: target.value,
            },
        }));
    };

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = {
			full_name: state.values.full_name,
			email: state.values.email,
			phone: state.values.phone,
			course_name: course,
			training_center: TRAINING_CENTERS.educational_school
		};

		try {
			if (formData.course_name !== t('contact-us-form.select-course')) {
				setState((prev: FormProps) => ({
					...prev,
					isLoading: true,
				}))
			};

			const res: ContactUsResponse = await sendContactUsEducational(formData);

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
				error: error.message,
			}));

			setOpen(true);
			setInfo({
				status: 'info',
				content: t('texts.send-message-failure')
			});
		}
	};

	const handleClose = () => setOpen(false);

	const getValueToSlug = (valueName: string, slug: string | number) => {
		const course = valueName === 'course_name' && lessonsArmenian?.find((lesson: LESSON) => {
			return lesson?.slug == slug;
		});

		if (course && course?.course_name) {
			return setCourse(course.course_name);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.fields}>
			<div className={styles.hosts}>
				<div>
					<h2 className={cn(styles.title, Arial.className)} style={{ color: theme }}>
						{t('contact-us-form.title')}
					</h2>
				</div>
				<div>
					{hosts}
				</div>
			</div>
			<Snackbar
				open={open}
				handleChange={handleClose}
				info={info}
			/>
			<div>
				<InputField
					className={cn(styles.input, Arial.className)}
					name='full_name'
					type='full_name'
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
					data={lessons}
					valueName='course_name'
					handleChange={setState}
					state={state}
					classNameProperty='large-educational'
					isClear={false}
					getValueToSlug={getValueToSlug}
				/>
			</div>
			<button className={cn(styles.submit, Arial.className)}>
				{isLoading ?
					`${t('contact-us-form.loading')}...`
					:
					<span>
						{t('contact-us-form.send')}
					</span>
				}
			</button>
		</form>
	);
};

export default React.memo(FormAppointment);