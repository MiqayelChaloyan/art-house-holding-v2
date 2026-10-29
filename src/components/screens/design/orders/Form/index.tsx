'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react';

import { useTranslations } from 'next-intl';

import Snackbar from '@/src/components/components/snackbar';

import InputField from '@/src/lib/ui/InputField';
import InputNumber from '@/src/lib/ui/InputNumber';
import TextareaField from '@/src/lib/ui/TextareaField';

import { Arial, Calibri } from '@/src/constants/font';

import { sendOrderDesign } from '@/src/api';
import { FormOrder } from '@/src/types/design';
import { ContactUsResponse } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    orders: ORDER_Result[];
    ordersArmenian: ORDER_Result[];
};

interface FormProps {
    isLoading: boolean;
    error: boolean;
    values: FormOrder;
};

const OrderForm = ({ orders, ordersArmenian }: Readonly<Props>) => {
    const [orderValue, setOrderValue] = useState<ORDER_Result | null>(null);
    const t = useTranslations();

    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState({
        status: 'success',
        content: t('texts.send-message-success')
    });

    const initValues = { full_name: '', email: '', phone: '', order: '', message: '', training_center: 44, };
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
            order: orderValue?.order_name,
            message: state.values.message,
            training_center: 48,
        };

        try {
            if (!orderValue?.order_name) {
                return
            }

            setState((prev: FormProps) => ({
                ...prev,
                isLoading: true,
            }));
    
            const res: ContactUsResponse = await sendOrderDesign(formData);
    
            if (res.status !== 200) {
                throw new Error('Failed to send message');
            }


            setOpen(true);
            setInfo({
                status: 'success',
                content: t('texts.send-message-success'),
            });

            setOrderValue(null);
            setState(() => ({
                ...initState,
                isLoading: false,
                error: false,
            }));
        } catch (error) {
            setOpen(true);
            setInfo({
                status: 'info',
                content: t('texts.send-message-failure'),
            });

            setState((prev: FormProps) => ({
                ...prev,
                isLoading: false,
                error: true,
            }));
        }
    };

    const handleClose = () => setOpen(false);

    const getValueToSlug = (slug: number | string) => {
        const order = ordersArmenian?.find((item: ORDER_Result) => {
            return item.slug === slug;
        });

        if (order?.order_name) {
            return setOrderValue(order);
        }
    };

    const ordersButtons = orders.map((order: ORDER_Result) => (
        <button
            key={order.slug}
            className={cn(styles['order-button'], Calibri.className, orderValue?.slug === order.slug && styles.disabled)}
            onClick={() => getValueToSlug(order.slug)}
            type='button'
            disabled={orderValue?.slug === order.slug}
        >
            {order.order_name}
        </button>
    )
    );


    return (
        <div className={styles.container}>
            <Snackbar open={open} handleChange={handleClose} info={info} />
            <div className={styles.contact}>
                <div className={cn(styles.contact_us)}>
                    <h2 className={cn(styles.form_title, Arial.className)}>
                        {t('contact-us-form.form-title-order')}
                    </h2>
                    <div className={styles.form}>
                        <form
                            className={styles.box}
                            onSubmit={handleSubmit}
                        >
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
                                <div className={styles.orders}>
                                    {ordersButtons}
                                </div>
                                <TextareaField
                                    className={cn(styles.textarea, Arial.className)}
                                    name='message'
                                    placeholder={t('contact-us-form.message')}
                                    requiredField={true}
                                    value={values.message}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type='submit' className={styles.button}>
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
        </div>
    )
};

export default OrderForm;