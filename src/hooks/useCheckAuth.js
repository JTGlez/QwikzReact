/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIdTokenResult } from "firebase/auth";
import { checkingCredentials, login, logout } from "../store/auth";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";
import { loadGroups } from "../helpers/loadGroups";
import { startLoadingGroups } from "../store/teachers/thunks";
import { loadStudentGroups } from "../helpers/loadStudentGroups";
import { startLoadingStudentGroups } from "../store/students/thunks";

export const useCheckAuth = () => {

    // Verification starts by default in false, as we are about to start checking
    const [verificationDone, setVerificationDone] = useState(false);
    const { status, accountType } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // Checks the current user from Firebase every time the app is loaded
    useEffect(() => {

        // Subscription to the user status: observable with returning values
        onAuthStateChanged(firebaseAuth, async (user) => {

            dispatch(checkingCredentials());
            // If no user is active, then cleans the auth state
            if (!user) {
                setVerificationDone(true);
                return dispatch(logout({}))
            }

            // If we have an user, call the login action
            const { uid, email, displayName, photoURL } = user;

            // Get the custom claims after reloading user info
            const { claims } = await getIdTokenResult(firebaseAuth.currentUser, true)
            const accountType = claims.accountType;
            dispatch(login({ uid, email, displayName, photoURL, accountType }));

            // Then, do something!
            if (accountType === 'teacher') {
                dispatch(startLoadingGroups());
                loadGroups();
            }

            else if (accountType === 'student') {
                dispatch(startLoadingStudentGroups());
                loadStudentGroups();
            }

            // After checking, we can go to the router
            setVerificationDone(true);
        });

    }, []);

    return {
        verificationDone,
        status,
        accountType
    }
}