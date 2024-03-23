/* eslint-disable no-unused-vars */
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { TextInput, Button } from "@tremor/react";
import { RiGoogleFill } from "@remixicon/react/";
import { Link } from 'react-router-dom';
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth"
import { useForm } from "../../hooks";
import { AuthLayout } from "../layout/AuthLayout";
import { RegisterPage } from "./RegisterPage";
import { Button as ShadButton } from "@/components/ui/button";
import LoginForm from "@/components/ui/login-form";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

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
            <section className='flex-1 flex'>
                <div className='container mx-auto mt-4 flex justify-center items-center'>
                    <Card className='w-[400px]'>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Enter your email and password to login
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <LoginForm />
                        </CardContent>
                        <CardFooter className='flex justify-center'>
                            <ShadButton asChild variant='link'>
                                <Link to='/auth/register'>Dont have an account?</Link>
                            </ShadButton>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        </AuthLayout>
    )
}