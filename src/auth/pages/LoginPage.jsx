/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
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

export const LoginPage = () => {

    return (
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
    )
}