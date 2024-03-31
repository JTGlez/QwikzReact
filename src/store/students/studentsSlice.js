import { createSlice } from '@reduxjs/toolkit';

export const studentsSlice = createSlice({
    name: 'students',
    initialState: {
        isJoiningGroup: false,
        groups: [],
        activeGroup: null,
        messageSaved: '',
        errorMessage: '',
    },
    reducers: {
        joiningNewGroup: (state) => {
            state.isJoiningGroup = true;
        },
        joinNewGroup: (state, action) => {
            state.groups.push(action.payload);
            state.isJoiningGroup = false;
            state.messageSaved = `${action.payload.GROUP_CODE} joined successfully!`;
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
        cleanStudentGroups: (state) => {
            state.isJoiningGroup = false;
            state.groups = [];
            state.activeGroup = null;
            state.messageSaved = '';
            state.errorMessage = '';
        }
    }
});
// Action creators
export const { 
    joiningNewGroup, 
    joinNewGroup, 
    setActiveGroup, 
    setGroups, 
    updateGroup, 
    setErrorMessage,
    clearMessageSaved,
    clearErrorMessage, 
    cleanStudentGroups,
    cleanActiveGroup } = studentsSlice.actions;