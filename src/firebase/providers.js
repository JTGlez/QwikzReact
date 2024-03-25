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
        const { user } = resp;

        // Update the user's profile with the displayName
        await updateProfile(user, { displayName }).catch((error) => {
            console.error('Error updating user profile:', error);
        });

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

        try {
            await signInWithCustomToken(firebaseAuth, customToken);

            // After creating the user and signing in, we can update his profile.
            await updateProfile(firebaseAuth.currentUser, { displayName });

        } catch (error) {
            await signOut(firebaseAuth);
            console.error('Error signing in with custom token:', error);
        }

        return {
            ok: true,
            uid: user.uid,
            photoURL: user.photoURL,
            email: user.email,
            displayName: user.displayName,
            accountType
        }

    } catch (error) {
        await signOut(firebaseAuth);
        return { ok: false, errorMessage: error.message }
    }

}

export const signInWithEmailPassword = async ({ email, password }) => {

    try {
        // Send the email and password to Flask API to get the custom token to login
        const flaskResp = await api.post(`/auth/login`, {
            email, password
        });

        if (flaskResp.data.ok === false) {
            return {
                ok: false,
                errorMessage: flaskResp.data.errorMessage
            }
        }

        const customToken = flaskResp.data.customToken;
        const resp = await signInWithCustomToken(firebaseAuth, customToken);
        const { user } = resp;

        // Get the custom claims
        const { claims } = await getIdTokenResult(firebaseAuth.currentUser, true)
        const accountType = claims.accountType;

        return {
            ok: true,
            uid: user.uid,
            photoURL: user.photoURL,
            email: user.email,
            displayName: user.displayName,
            accountType
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