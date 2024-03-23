/* eslint-disable no-unused-vars */
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithCustomToken,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    reload,
    getIdTokenResult
} from "firebase/auth";
import { firebaseAuth } from "./config";
import { api } from "../api";

// GoogleProvider
const googleProvider = new GoogleAuthProvider();

// Register a user with email and password and set their custom claims
export const registerUserWithEmailPassword = async ({ displayName, email, password, accountType }) => {

    try {

        // Register the user with email and password in Firebase
        const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        // Retrieves the user's token to send it to the Flask backend
        const token = await getCurrentUserToken();

        // Calls the Flask-Axios backend to register the user and set their custom claims using the token
        const flaskResp = await api.post('/auth/register', {
            accountType
        }, {
            headers: {
                'Authorization': `Bearer ${token.token}`,
                'Content-Type': 'application/json',
            }
        });

        // Get the custom token from the Flask backend
        const customToken = flaskResp.data.customToken;

        // Sign in with the custom token from the Flask backend (Using a nested try-catch block)
        try {

            const resp = await signInWithCustomToken(firebaseAuth, customToken);
            // After creating the user and signing in, we can update his profile.
            await updateProfile(firebaseAuth.currentUser, { displayName });

        } catch (error) {
            console.error('Error signing in with custom token:', error);
        }

        return {
            ok: true,
            uid, photoURL, email, displayName, accountType
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }

}

export const signInWithEmailPassword = async ({ email, password }) => {

    console.log("Aque llego")
    console.log(email, password)

    try {
        const resp = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;

        // Force reload to get the custom claims
        await reload(resp.user);

        // Get the custom claims after reloading user info
        const { claims } = await getIdTokenResult(firebaseAuth.currentUser, true)
        const accountType = claims.accountType;

        // Retrieves the user's token to send it to the Flask backend
        const token = await getCurrentUserToken();

        // Verify if the user has the declared custom claims sending a request validation to the Flask backend
        /*         const flaskResp = await api.post(`/auth/verify`, {
                    accountType,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token.token}`,
                        'Content-Type': 'application/json',
                    }
                })
        
                // The accountType in the client and the accountType in the Flask backend must match
                if (flaskResp.data.ok === false) {
                    await signOut(firebaseAuth);
                    return {
                        ok: false,
                        errorMessage: flaskResp.data.errorMessage
                    }
                } */

        return {
            ok: true,
            uid, photoURL, email, displayName, accountType
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage, errorCode
        }
    }
}

export const signInWithGoogle = async () => {

    try {
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const { displayName, email, photoURL, uid } = user;

        return {
            ok: true,
            // User Info
            displayName, email, photoURL, uid
        }

    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);

        return {
            ok: false,
            errorMessage, errorCode
        }
    }
}

export const signOutApp = async () => {
    try {
        await signOut(firebaseAuth);

        return {
            ok: true,
            errorMessage: null
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)

        return {
            ok: false,
            errorMessage, errorCode
        }
    }
}

// Get the current user token to send it to the Flask backend
export const getCurrentUserToken = async () => {
    try {
        const user = firebaseAuth.currentUser;
        if (user) {
            const token = await user.getIdToken();
            return {
                ok: true,
                token
            };
        } else {
            return {
                ok: false,
                errorMessage: 'No user is currently signed in.'
            };
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        };
    }
};