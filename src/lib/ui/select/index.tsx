'use client'

import React, { useEffect, useRef, useState } from 'react';

import { Arial } from '@/src/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface FormProps {
    isLoading: boolean;
    values: any;
};

interface SelectProps {
    data: SELECT_OPTIONS_LANGUAGE_QUERYResult[] | LESSON[];
    state: FormProps;
    valueName: string;
    handleChange: (value: number | any) => void;
    classNameProperty: string;
    isClear: boolean;
    getValueToSlug: (key: string, slug: number) => void;
};

const Select = ({
    data,
    state,
    valueName,
    handleChange,
    classNameProperty,
    isClear,
    getValueToSlug
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const componentRef = useRef<HTMLDivElement>(null);
    const [num, setNum] = useState<number>(0)

    const handleSelect = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = ( e: React.MouseEvent<MouseEvent | any>) => {
        const selectedText = e.currentTarget.querySelector('label').textContent;
        const selectedId = e.currentTarget.querySelector('label').id;

        setNum(1);

        getValueToSlug(valueName, selectedId);

        handleChange((prev: FormProps) => ({
            ...prev,
            values: {
                ...prev.values,
                [valueName]: selectedText,
            },
        }));

        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const colorTheme = () => {
        const color = classNameProperty !== 'large' && classNameProperty !== 'large-educational' ? (num > 0 && !isClear ? 'black' : '#D4C7BA') : '#fff';
        return { color };
    }

    return (
        <div
            ref={componentRef}
            className={cn(styles[`${classNameProperty}-select`], isOpen ? styles.active : '', Arial.className)}
        >
            <span
                className={styles[`${classNameProperty}-select-button`]}
                role="combobox"
                aria-labelledby="select button"
                aria-haspopup="listbox"
                aria-expanded={isOpen ? 'true' : 'false'}
                aria-controls="select-dropdown"
                onClick={handleSelect}
            >
                <span className={styles[`${classNameProperty}-selected-value`]} style={colorTheme()}>{state.values[valueName]}</span>
                <span className={styles[`${classNameProperty}-arrow`]}></span>
            </span>
            <ul className={styles[`${classNameProperty}-select-dropdown`]} role="listbox" id="select-dropdown">
                {data?.map((item: any, index: number) => (
                    <li
                        key={item?.slug.current || index}
                        role="option"
                        aria-selected={state.values[valueName] === item?.[valueName]}
                        onClick={handleOptionClick}
                        tabIndex={index}
                    >
                        <input type="radio" id={valueName} name={valueName} />
                        <label htmlFor={item?.valueName} id={item?.slug}>{item?.[valueName]}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default React.memo(Select);