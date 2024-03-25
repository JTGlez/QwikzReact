/* eslint-disable no-unused-vars */
import { checkingCredentials, login, logout } from "./authSlice";
import { cleanTeacherGroups } from "../teachers/teachersSlice";
import { cleanStudentGroups } from "../students/studentsSlice"; 
import { signInWithGoogle, registerUserWithEmailPassword, signInWithEmailPassword, signOutApp } from "../../firebase/providers";
import { api } from "../../api";

// Thunks: dispatch with async actions
// A Thunk is a function that returns another function, which receives the dispatch as an argument.

export const startCreatingUserWithEmailPassword = (displayName, email, password, accountType) => {

    return async (dispatch) => {
        dispatch(checkingCredentials());

        try {
            // Register the user with email and password in Firebase
            const { ok, uid, errorMessage, photoURL } = await registerUserWithEmailPassword({ displayName, email, password, accountType });

            if (!ok) return dispatch(logout({ errorMessage }));

            // If the user is created, then login with the user data in the client
            dispatch(login({ uid, displayName, email, photoURL, accountType }));

        } catch (error) {
            return dispatch(logout({ errorMessage: error.message }));
        }

    }
}

export const startLoginWithEmailPassword = (email, password ) => {

    console.log(email, password)

    return async (dispatch) => {

        dispatch(checkingCredentials());
        const { ok, uid, errorMessage, photoURL, displayName, accountType } = await signInWithEmailPassword({ email, password });
        
        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, displayName, email, photoURL, accountType }));

    }

}

export const startLogout = () => {

    return async (dispatch, getState) => {
        await signOutApp();
        dispatch(logout());
        dispatch(cleanTeacherGroups());
        dispatch(cleanStudentGroups());
    }
}

export const startGoogleSignIn = () => {

    return async (dispatch) => {
        // Starts SignIn process
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        // If the login fails, then dispatch the logout action with the error message
        if (!result.ok) return dispatch(logout(result.errorMessage));

        // Instead, if result.ok is true, then login with the user data
        dispatch(login(result));

    }
}