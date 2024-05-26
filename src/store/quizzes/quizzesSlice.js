import { createSlice } from "@reduxjs/toolkit";

export const quizzesSlice = createSlice({
  name: "quizzes",
  initialState: {
    isSendingAnswers: false,
    quiz: null,
    results: null,
    applicationID: null,
    messageSaved: "",
    errorMessage: "",
  },
  reducers: {
    sendingQuizzAnswers: (state) => {
      state.isSendingAnswers = true;
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setGif: (state, action) => {
      state.gif = action.payload;
    },
    clearGif: (state) => {
      state.gif = null;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});
// Action creators
export const {
  sendingQuizzAnswers,
  setQuiz,
  setResults,
  setGif,
  clearGif,
  setErrorMessage,
} = quizzesSlice.actions;
