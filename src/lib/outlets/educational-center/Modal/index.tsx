'use client'

import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { closeModal, stateModal } from '@/src/store/modal_reducer';
import { Questions } from '@/src/store/question_reducer';

import { IoClose } from 'react-icons/io5';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    children: React.ReactElement;
};

interface RootState {
    questions: Questions;
    modal: stateModal;
};

const SectionCareerServices = ({ children }: Props) => {
    const { isOpen } = useSelector((state: RootState) => state.modal);

    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            const timerId = setTimeout(() => setShowModal(true), 1);
            return () => clearTimeout(timerId);
        } else {
            setShowModal(false);
        }
    }, [isOpen]);

    return (
        <div className={cn(styles.box, isOpen && styles.boxOpen)}>
            <div className={styles.wrap}>
                <div
                    className={cn(styles.overlay, { [styles.overlayShow]: showModal })}
                    onClick={() => {
                        setShowModal(false);
                        setTimeout(() => dispatch(closeModal(false)), 300);
                    }}
                ></div>
                <div className={cn(styles.content, { [styles.contentShow]: showModal })}>
                    <button className={styles.close}
                        title='Close'
                        onClick={() => {
                            setShowModal(false);
                            setTimeout(() => dispatch(closeModal(false)), 300);
                        }}>
                        <IoClose size={100} fill={colors.white} />
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default React.memo(SectionCareerServices);

















