import { createSlice } from '@reduxjs/toolkit';

export const teachersSlice = createSlice({
    name: 'teachers',
    initialState: {
        isSavingGroup: false,
        isSavingQuiz: false,
        groups: [],
        activeGroup: null,
        messageSaved: '',
        errorMessage: '',

        /*
        activeGroup: {
            groupName: 'Math',
            groupCode: 'G123',
            acccessToken: '123456',
        },

         */
    },
    reducers: {
        savingNewGroup: (state) => {
            state.isSavingGroup = true;
        },
        savingNewQuiz: (state) => {
            state.isSavingQuiz = true;
        },
        addNewGroup: (state, action) => {
            state.groups.push(action.payload);
            state.isSavingGroup = false;
            state.messageSaved = `${action.payload.GROUP_CODE} creado de forma exitosa!`;
        },
        addNewQuiz: (state, action) => {
            state.isSavingQuiz = false;
            state.messageSaved = `Quizz ${action.payload.QUIZZ_NAME} creado de forma exitosa!`;
        },
        setActiveGroup: (state, action) => {
            state.activeGroup = action.payload;
        },
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        updateGroup: (state, action) => {
            for (let index = 0; index < state.groups.length; index++) {
                if (state.groups[index].id === action.payload.id) {
                    state.groups[index] = action.payload;
                }
            }

            state.messageSaved = `${action.payload.GROUP_CODE} updated successfully!`;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        clearMessageSaved: (state) => {
            state.messageSaved = '';
        },
        clearErrorMessage: (state) => {
            state.errorMessage = '';
        },
        cleanActiveGroup: (state) => {
            state.activeGroup = null;
        },
        cleanTeacherGroups: (state) => {
            state.isSavingGroup = false;
            state.groups = [];
            state.activeGroup = null;
            state.messageSaved = '';
            state.errorMessage = '';
        }
    }
});
// Action creators
export const { 
    savingNewGroup, 
    addNewGroup, 
    setActiveGroup,
    savingNewQuiz,
    addNewQuiz, 
    setGroups, 
    updateGroup, 
    setErrorMessage,
    clearMessageSaved,
    clearErrorMessage, 
    cleanTeacherGroups,
    cleanActiveGroup } = teachersSlice.actions;