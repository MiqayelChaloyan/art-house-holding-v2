'use client'

import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { useTranslations } from 'next-intl';

import { useDispatch, useSelector } from 'react-redux';
import * as Action from '@/src/store/question_reducer';

import ProgressLine from '@/src/lib/ui/progress-line';
import { Loader } from '@/src/lib/ui/loading';
import { ArianAMU, Calibri } from '@/src/constants/font';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Step {
    index: number;
    trace: number;
};

interface Props {
    steps: number[];
};

const calculateLevel = (score: number, totalQuestions: number) => {
    const answerResult = Math.round((score * 100) / totalQuestions);
    const oneQuestionMissThreshold = ((totalQuestions - 1) / totalQuestions) * 100;

    let color = '';
    let status = '';

    if (answerResult <= 45) {
        color = colors.grapefruit;
        status = 'Beginner';
    } else if (answerResult > 45 && answerResult < oneQuestionMissThreshold) {
        color = colors.blue;
        status = 'Pre-Intermediate';
    } else if (answerResult >= oneQuestionMissThreshold) {
        color = colors.green;
        status = 'Intermediate';
    }

    return { answerResult, color, status };
};


const Step = ({ index, trace }: Step) => {
    const done = index < trace;
    const activeStep = index === trace;
    const activeClassName = activeStep ? styles.stepper__step__active : '';
    const doneClassName = done ? styles.stepper__step__done : '';

    return <div className={cn(styles.stepper__step, activeClassName, doneClassName)} />
};


const Stepper = ({ steps }: Props) => {
    const trace = useSelector((state: { questions: Action.Questions }) => state.questions.trace);
    const questions = useSelector((state: { questions: Action.Questions }) => state.questions.quiz);

    return (
        <div className={styles.stepper_contain}>
            <div>
                <h2 className={cn(styles.steps, Calibri.className)}>
                    {trace + 1}/{questions.length}
                </h2>
            </div>
            <div className={styles.stepper}>
                {steps.map((_: unknown, index: number) =>
                    <Step key={index} trace={trace} index={index} />
                )}
            </div>
        </div>
    )
};


const HorizontalLinearStepper = () => {
    const questions = useSelector((state: { questions: Action.Questions }) => state.questions?.quiz);
    const question = useSelector((state: { questions: Action.Questions }) => state.questions?.quiz[state.questions.trace]);
    const trace = useSelector((state: { questions: Action.Questions }) => state.questions?.trace);
    const score = useSelector((state: { questions: Action.Questions }) => state.questions?.score);
    const isLoading = useSelector((state: { questions: Action.Questions }) => state.questions?.isLoading);

    const steps = Array.from({ length: questions.length }, (_, i) => i);

    const [isViewer, setIsViewer] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean[]>(Array(question?.options.length).fill(false));
    const [isAnyChecked, setIsAnyChecked] = useState<boolean>(false);

    const isBrowser = () => typeof window !== 'undefined';

    const t = useTranslations();

    const dispatch = useDispatch();

    useEffect(() => {
        setIsChecked(Array(question?.options.length).fill(false));
        setIsAnyChecked(false);
    }, [question]);

    useEffect(() => {
        const anyChecked = isChecked.some(checked => checked);
        setIsAnyChecked(anyChecked);
    }, [isChecked]);

    const onNext = () => {
        if (trace < questions?.length - 1) {
            dispatch(Action.moveNextAction());
        } else {
            setIsViewer(true);
        }
    };

    const onPrev = () => {
        dispatch(Action.movePrevAction());
    };

    const onSelect = (i: number) => {
        setIsChecked(prevState => prevState.map((_, index) => index === i));
        if (question.answer === question.options[i]) {
            dispatch(Action.addScore());
            dispatch(Action.addedAnswer({
                question: question.question,
                wrongAnswer: false,
                correctAnswer: question.answer
            }));
        } else {
            dispatch(Action.addedAnswer({
                question: question.question,
                wrongAnswer: question.options[i],
                correctAnswer: question.answer
            }));
        }
    };

    const scrollToTop = () => {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleView = () => {
        scrollToTop()
        dispatch(Action.viewAnswer());
    };

    const { answerResult, color, status } = calculateLevel(score, questions.length);

    if (isLoading) return (
        <div className={styles.loader}>
            <Loader />
        </div>
    );

    if (isViewer) return (
        <div className={styles.viewer_result}>
            <h2 className={cn(styles.viewer_title, ArianAMU.className)}>
                {t('titles.quiz-result')}
            </h2>
            <ProgressLine
                backgroundColor="lightblue"
                visualParts={[
                    {
                        percentage: `${answerResult}%`,
                        color: color
                    }
                ]}
            />
            <div className={styles.row}>
                <p className={ArianAMU.className}>{t('texts.total-points')}</p>
                <p className={ArianAMU.className}>{score}</p>
            </div>
            <div className={styles.row}>
                <p className={ArianAMU.className}>{t('texts.total-questions')}</p>
                <p className={ArianAMU.className}>{questions.length}</p>
            </div>
            <div className={styles.row}>
                <p className={ArianAMU.className}>{t('texts.quiz-result')}</p>
                <p className={ArianAMU.className}>{status}</p>
            </div>

            <div className={styles.buttons_view}>
                <button className={cn(styles.btn_view, ArianAMU.className)} onClick={handleView}>
                    {t('buttons.view')}
                </button>
            </div>
        </div>
    );

    return (
        <div className={styles['horizontal-linear-stepper']}>
            <Stepper steps={steps} />
            <div className={styles.questions}>
                <h2 className={cn(styles.text_light, question?.question.length >= 100 ? styles.long : styles.short)}>{question?.question}</h2>
                <ul className={styles.answers}>
                    {question?.options.map((q: string, i: number) => (
                        <li key={i}>
                            <input
                                type='radio'
                                value={q}
                                id={`q${i}-option`}
                                onChange={() => onSelect(i)}
                                checked={isChecked[i] || false}
                            />
                            <label className={styles.text_primary} htmlFor={`q${i}-option`}>{q}</label>
                            <div className={styles.check}></div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.buttons}>
                {trace !== 0 ? <button className={cn(styles.btn, styles.prev)} onClick={onPrev}>
                    <FaArrowLeft fill={colors.white} /></button> : null
                }
                <button className={cn(styles.btn, styles.next, !isAnyChecked ? styles.next_btn : '')} onClick={onNext} disabled={!isAnyChecked}>
                    {trace !== questions.length - 1 ? <FaArrowRight fill={colors.white} /> : <span>{t('buttons.confirm')}</span>}
                </button>
            </div>
        </div>
    );
};

export default React.memo(HorizontalLinearStepper);