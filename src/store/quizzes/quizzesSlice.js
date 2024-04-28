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
        },
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        setCurrentQuestionIndex: (state, action) => {
            state.currentQuestionIndex = action.payload;
        },
        setAnswer: (state, action) => {
            const { questionIndex, answer } = action.payload;
            if (state.questions && state.questions[questionIndex]) {
                state.questions[questionIndex].selectedAnswer = answer;
                if (state.questions[questionIndex].correct_answer === answer) {
                    state.correctAnswersCount += 1;
                }
            }
        },
        resetQuiz: (state) => {
            state.currentQuestionIndex = 0;
            state.correctAnswersCount = 0;
            if (state.questions) {
                state.questions.forEach(question => {
                    delete question.selectedAnswer;
                });
            }
        },
        setShowResults: (state, action) => {
            state.showResults = action.payload;
        }
    }
});
// Action creators
export const { 
    sendingQuizzAnswers, 
    setQuestions, 
    setCurrentQuestionIndex, 
    setAnswer, 
    resetQuiz,
    setShowResults } = quizzesSlice.actions;
