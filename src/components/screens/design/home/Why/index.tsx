'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import { designFont } from '@/src/constants/font';
import { keepWords } from '@/src/components/screens/design/keepWords';
import { splitTitlePeriod, TitlePeriod, withRedQuestion } from '@/src/components/screens/design/titlePeriod';

import cn from 'classnames';

import styles from './styles.module.sass';


const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const renderWhySecondLine = (text: string, emphasisWord: string) => {
    if (!text) return null;

    const question = text.match(/(\?)\s*$/);
    const source = question && question.index !== undefined ? text.slice(0, question.index) : text;
    const { body, period } = splitTitlePeriod(source);
    const mark = question ? '?' : period;
    const word = emphasisWord.replace(/[.․։?]\s*$/, '');

    if (!word) {
        return (
            <>
                {keepWords(body)}
                <TitlePeriod mark={mark} />
            </>
        );
    }

    const match = body.match(new RegExp(`^(.*?)(${escapeRegExp(word)})(.*)$`, 'iu'));
    if (!match) {
        return (
            <>
                {keepWords(body)}
                <TitlePeriod mark={mark} />
            </>
        );
    }

    const [, before, emphasis, after] = match;

    return (
        <>
            {before ? keepWords(before) : null}
            <span className={styles.emphasis}>{emphasis}</span>
            {after ? keepWords(after) : null}
            <TitlePeriod mark={mark} />
        </>
    );
};

interface Props {
    section?: WHY_SECTION;
};

const Why = ({ section }: Readonly<Props>) => {
    const t = useTranslations('why-section');

    const copy = {
        eyebrow: t('eyebrow'),
        line1: t('line-1'),
        line2: t('line-2'),
        emphasisWord: t('emphasis-word'),
    };

    const items = (section?.items || []).slice(0, 30);

    return (
        <section id="why-art-house" className={cn(styles.section, designFont.ui)}>
            <div className={styles.wrap}>
                <header className={styles.header}>
                    <p className={styles.eyebrow}>
                        <span className={styles.mark} aria-hidden />
                        {copy.eyebrow}
                    </p>
                    <h2 className={cn(styles.headline, designFont.serif)}>
                        <span>{withRedQuestion(copy.line1)}</span>
                        <span>{renderWhySecondLine(copy.line2, copy.emphasisWord)}</span>
                    </h2>
                </header>
                <ul className={styles.grid}>
                    {items.map((item) => (
                        <li key={item._key} className={styles.cell}>
                            <div className={styles.numberRow}>
                                <span className={cn(styles.number, designFont.mono)}>{item.number}</span>
                                <span className={styles.rule} aria-hidden />
                            </div>
                            <h3 className={styles.title}>{item.title}</h3>
                            <p className={styles.description}>{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default React.memo(Why);
