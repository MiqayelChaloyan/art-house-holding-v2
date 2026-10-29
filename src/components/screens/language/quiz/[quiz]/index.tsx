'use client'

import React, { useEffect } from 'react';

import QuizForm from '@/src/components/components/quiz-form';
import QuestionsViewer from '@/src/components/components/quiz-form/viewer';

import { useDispatch, useSelector } from 'react-redux';
import * as Action from '@/src/store/question_reducer'

import styles from './styles.module.sass';


interface Props {
    data: QUIZ_QUERYResult;
};

const QuizPage = ({ data }: Readonly<Props>) => {
    const isViewAnswer = useSelector((state: {questions: Action.Questions}) => state.questions.isViewAnswer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Action.startExamAction(data.questions));
        dispatch(Action.updateLoader(false));
    }, [dispatch, data.questions]);


    return (
        <section>
            {isViewAnswer ?
                <QuestionsViewer />
                :
                <div className={styles.row}>
                    <div className={styles.man} />
                    <QuizForm />
                    <div className={styles.woman} />
                </div>
            }
        </section>
    );
};

export default React.memo(QuizPage);