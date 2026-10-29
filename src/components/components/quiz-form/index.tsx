'use client'

import HorizontalLinearStepper from './steppers/HorizontalLinearStepper';
import VerticalLinearStepper from './steppers/VerticalLinearStepper';

import useWindowSize from '@/src/hooks/useWindowSize';

import styles from './styles.module.sass';


const QuizForm = () => {
  const windowSize = useWindowSize();

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        {windowSize.width < 600 ?
            <VerticalLinearStepper />
            :
            <HorizontalLinearStepper />
        }
      </div>
    </div>
  )
}

export default QuizForm;
