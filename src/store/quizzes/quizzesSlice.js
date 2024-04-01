import { createSlice } from '@reduxjs/toolkit';

export const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState: {
        isSendingAnswers: false,
        questions: null,
        currentQuestionIndex: 0,
        currenAnswer: "",
        applicationID: null,
        showResults: false,
        correctAnswersCount: 0,
        messageSaved: '',
        errorMessage: '',
    },
    reducers: {
        sendingQuizzAnswers: (state) => {
            state.isSendingAnswers = true;
        }
    }
});
// Action creators
export const {
    sendingQuizzAnswers
} = quizzesSlice.actions;