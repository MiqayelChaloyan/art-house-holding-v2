'use client'

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';
import * as Action from '@/src/store/question_reducer';

import { Loader } from '@/src/lib/ui/loading';
import { ArianAMU } from '@/src/constants/font';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


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


const Progress = ({ strokeWidth, percentage, color }: any) => {
  const radius = (50 - strokeWidth / 2);
  const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;

  const diameter = Math.PI * 2 * radius;
  const progressStyle = {
    stroke: color,
    strokeLinecap: 'round',
    strokeDasharray: `${diameter}px ${diameter}px`,
    strokeDashoffset: `${((100 - percentage) / 100 * diameter)}px`,
  };

  return (
    <svg
      className={'CircularProgressbar'}
      viewBox="0 0 100 100"
      width={100}
      height={100}
    >
      <path
        className="CircularProgressbar-trail"
        d={pathDescription}
        strokeWidth={strokeWidth}
        fillOpacity={0}
        style={{
          stroke: colors.iron,
        }}
      />

      <path
        className="CircularProgressbar-path"
        d={pathDescription}
        strokeWidth={strokeWidth}
        fillOpacity={0}
        style={progressStyle as any}
      />
      <text
        className="CircularProgressbar-text"
        x={50}
        y={50}
        style={{
          fill: color,
          fontSize: '24px',
          dominantBaseline: 'central',
          textAnchor: 'middle',
        }}
      >
        {percentage}%
      </text>
    </svg>
  );
};


const VerticalLinearStepper = () => {
  const questions = useSelector((state: { questions: Action.Questions }) => state.questions?.quiz);
  const question = useSelector((state: { questions: Action.Questions }) => state.questions?.quiz[state.questions.trace]);
  const trace = useSelector((state: { questions: Action.Questions }) => state.questions?.trace);
  const score = useSelector((state: { questions: Action.Questions }) => state.questions?.score);
  const isLoading = useSelector((state: { questions: Action.Questions }) => state.questions?.isLoading);

  const [activeStep, setActiveStep] = useState<number>(0);
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

  const scrollToTop = () => {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const onNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (trace < questions?.length - 1) {
      dispatch(Action.moveNextAction());
    } else {
      setIsViewer(true);
      scrollToTop();
    }
  };

  const onPrev = () => {
    dispatch(Action.movePrevAction());
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
    <div>
      <h2 className={cn(styles.viewer_title, ArianAMU.className)}>
        {t('titles.quiz-result')}
      </h2>
      <div className={styles.result}>
        <div className={styles.progress}>
          <Progress strokeWidth={8} percentage={Math.floor(answerResult)} color={color} />
        </div>
        <div>
          <div className={styles.row}>
            <p className={ArianAMU.className}>{t('texts.total-points')}</p>
            <p className={ArianAMU.className}>{`${score}/${questions.length}`}</p>
          </div>
          <div className={styles.row}>
            <p className={ArianAMU.className}>{t('texts.quiz-result')}</p>
            <p className={ArianAMU.className}>{status}</p>
          </div>
        </div>
      </div>
      <button className={cn(styles.btn_view, ArianAMU.className)} onClick={handleView}>
        {t('buttons.view')}
      </button>
    </div>
  )

  return (
    <Box sx={{ maxWidth: 400 }} className={styles['vertical-linear-stepper']}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {questions.map((step: Action.QUIZ, index: number) => (
          <Step key={step.question}>
            <StepLabel>
              {step.question}
            </StepLabel>
            <StepContent>
              <Box>
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
              </Box>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={onNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={!isAnyChecked}
                    className={ArianAMU.className}
                  >
                    {trace !== questions.length - 1 ? t('buttons.next') : t('buttons.confirm')}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={onPrev}
                    sx={{ mt: 1, mr: 1 }}
                    className={ArianAMU.className}
                  >
                    {t('buttons.back')}
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default VerticalLinearStepper;