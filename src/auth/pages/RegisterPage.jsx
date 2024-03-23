/* eslint-disable no-unused-vars */
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from "../layout/AuthLayout"
import { Button } from '@/components/ui/button'
import RegisterForm from '@/components/ui/register-form'
export const RegisterPage = () => {

    return (
        <AuthLayout>
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
                                <a href={'/auth/login'}>Already have an account?</a>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        </AuthLayout>
    )
}
