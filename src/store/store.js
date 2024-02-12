import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { teachersSlice } from './teachers'
import { studentsSlice } from './students'

// Internally combineReducers sets all the reducers in a "super" reducer
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        teachers: teachersSlice.reducer,
        students: studentsSlice.reducer,
    },
})