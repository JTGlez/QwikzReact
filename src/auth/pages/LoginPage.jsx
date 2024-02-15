/* eslint-disable no-unused-vars */
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { TextInput, Button } from "@tremor/react";
import { RiGoogleFill } from "@remixicon/react/";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth"
import { useForm } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout";
import { RegisterPage } from "./RegisterPage";

// We declare the initialForm outside the component to avoid an infinite loop on the useEffect that regenerates the form 
const initialForm = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    // useState flag to show the form has been submited
    const [formSubmited, setFormSubmited] = useState(false);

    // Redux hooks to dispatch actions and get the auth state from the store
    const dispatch = useDispatch();

    const formRules = {
        email: [(value) => value.includes('@'), 'Email should have an @'],
        password: [(value) => value.length >= 6, 'Password must have min 6 characters']
    }

    const { email, password, formState, isFormValid, onInputChange } = useForm(initialForm, formRules);

    // Auth with email and password
    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmited(true);

        // Don't send to the backend!
        if (!isFormValid) return;

        // Send user and password to login with Firebase
        dispatch(startLoginWithEmailPassword(formState));
    }

    // Auth with Google Account
    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    }

    return (
        <AuthLayout>
            <form
                className="mt-6"
                onSubmit={onSubmit}
                aria-label="login-form"
            >
                <label
                    htmlFor="email"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                    Email
                </label>
                <TextInput
                    type="email"
                    icon={''}
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Your email"
                    className="mt-2 mb-2"
                    value={email}
                    onChange={onInputChange}
                />
                <label
                    htmlFor="password"
                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                    Password
                </label>
                <TextInput
                    type="password"
                    icon={''}
                    id="password"
                    name="password"
                    autoComplete="password"
                    placeholder="Type your password"
                    className="mt-2"
                    value={password}
                    onChange={onInputChange}
                />
                <Button
                    variant="primary"
                    type="submit"
                    className="mt-4 w-full"
                    disabled={!isFormValid}
                >
                    Sign in
                </Button>
            </form>
            {/* <Button
                variant="secondary"
                className="mt-4 w-full"
                onClick={onGoogleSignIn}
                icon={RiGoogleFill}
            >
                Sign in with Google
            </Button> */}
            <RegisterPage />
        </AuthLayout>
    )
}