import { createSlice } from '@reduxjs/toolkit';

export interface QUIZ {
    question: string;
    slug: string;
    options: string[];
    answer: string;
};

export interface Questions {
    quiz: QUIZ[];
    trace: number;
    score: number;
    answer: string[];
    isLoading: boolean;
    isViewAnswer: boolean;
};

const initialState: Questions = {
    quiz: [],
    trace: 0,
    score: 0,
    answer: [],
    isLoading: true,
    isViewAnswer: false,
};

export const questionReducer = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        startExamAction: (state, action) => {
            let quiz = action.payload

            return {
                ...state,
                quiz: quiz,
            }
        },
        addScore: (state) => {
            return {
                ...state,
                score: state.score + 1,
            }
        },
        moveNextAction: (state) => {
            return {
                ...state,
                trace: state.trace + 1
            }
        },
        movePrevAction: (state) => {
            return {
                ...state,
                trace: state.trace - 1
            }
        },
        resetAllAction: () => {
            return {
                quiz: [],
                trace: 0,
                score: 0,
                answer: [],
                isLoading: true,
                isViewAnswer: false,
            }
        },
        updateLoader: (state, action) => {
            return {
                ...state,
                isLoading: action.payload
            }
        },
        viewAnswer: (state) => {
            return {
                ...state,
                isViewAnswer: !state.isViewAnswer
            }
        },
        addedAnswer: (state, action) => {
            state.answer.push(action.payload)
        },
        addedDuration: (state, action) => {
            return {
                ...state,
                duration: action.payload
            }
        },
    }
})

export const {
    startExamAction,
    moveNextAction,
    movePrevAction,
    addScore,
    resetAllAction,
    updateLoader,
    viewAnswer,
    addedAnswer
} = questionReducer.actions;

export default questionReducer.reducer;