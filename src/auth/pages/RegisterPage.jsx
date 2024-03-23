/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import RegisterForm from '@/components/ui/register-form'

export const RegisterPage = () => {

    return (
            <section className='flex-1 flex'>
                <div className='container mx-auto mt-4 flex items-center justify-center'>
                    <Card className='w-[350px]'>
                        <CardHeader>
                            <CardTitle>Create an account</CardTitle>
                            <CardDescription>
                                Enter your email below to create your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='grid gap-4'>
                            <RegisterForm />
                        </CardContent>
                        <CardFooter className='flex justify-center'>
                            <Button asChild variant='link'>
                                <Link to='/auth/login'>Already have an account?</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>
    )
}