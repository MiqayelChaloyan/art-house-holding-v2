'use client'

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { useDispatch, useSelector } from 'react-redux';
import * as Action from '@/src/store/question_reducer';

import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

import Container from '@/src/components/components/container';
import { ArianAMU } from '@/src/constants/font';
import { Pages } from '@/src/constants/pages';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


const QuestionsViewer = () => {
    const answer = useSelector((state: any) => state.questions.answer);
    const dispatch = useDispatch();
    const t = useTranslations();
    const localActive = useLocale();

    const answers = answer.map((item: any, index: number) => (
        <div key={index} className={styles.answer}>
            <h3 className={cn(styles.question, ArianAMU.className)}>{item.question}</h3>
            {
                item.wrongAnswer &&
                <div className={styles.wrong}>
                    <p className={cn(styles.text, ArianAMU.className)}>{item.wrongAnswer}</p>
                    <IoClose fill={colors.white} />
                </div>
            }
            <div className={styles.correct} style={{ backgroundColor: item.wrongAnswer ? colors.blue : colors.leafGreen }}>
                <p className={cn(styles.text, ArianAMU.className)}>{item.correctAnswer}</p>
                <FaCheck fill={colors.white} />
            </div>

        </div>
    ));


    return (
        <section id='answers'>
            <Container className='container'>
                <h1 className={cn(styles.title, ArianAMU.className)}>{t('sections.your-answers')}</h1>
                <div className={styles.container}>
                    {answers}
                </div>
                <Link
                    href={`/${localActive}${Pages.LANGUAGE_TAKE_TEST}/`}
                    aria-label={`/${localActive}${Pages.LANGUAGE_TAKE_TEST}/`}
                    className={cn(styles.link, ArianAMU.className)}
                    onClick={() =>  dispatch(Action.resetAllAction())}
                    scroll={true}
                >
                    {t('buttons.go-back')}
                </Link>
            </Container>
        </section>
    )
}


export default QuestionsViewer;