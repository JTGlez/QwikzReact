import { createSlice } from '@reduxjs/toolkit';

export const teachersSlice = createSlice({
    name: 'teachers',
    initialState: {
        isSavingGroup: false,
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
        addNewGroup: (state, action) => {
            state.groups.push(action.payload);
            state.isSavingGroup = false;
            state.messageSaved = `${action.payload.groupCode} creado de forma exitosa!`;
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

            state.messageSaved = `${action.payload.groupCode} updated successfully!`;
        },
        clearMessageSaved: (state) => {
            state.messageSaved = '';
        },
    }
});
// Action creators
export const { savingNewGroup, addNewGroup, setActiveGroup, setGroups, updateGroup, clearMessageSaved } = teachersSlice.actions;