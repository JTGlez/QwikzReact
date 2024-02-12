/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Dialog, DialogPanel, Title, TextInput, Button, Select, SelectItem } from "@tremor/react"
import { startCreatingUserWithEmailPassword } from "../../store/auth";
import { useForm } from "../../hooks";

// We declare the initialForm outside the component to avoid an infinite loop on the useEffect that regenerates the form 
const initialForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export const RegisterPage = () => {

    // useState flag to show the form has been submited
    const [formSubmited, setFormSubmited] = useState(false);

    // useState flag to validate the passwords
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    // useState flag to show the register dialog
    const [isRegisterOpen, setisRegisterOpen] = useState(false);

    // useState flag to select the account type
    const [accountType, setAccountType] = useState('');

    // Redux hooks to dispatch actions and get the auth state from the store
    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector(state => state.auth);

    const formRules = {
        email: [(value) => value.includes('@'), 'Email should have an @'],
        password: [(value) => value.length >= 6, 'Password must have min 6 characters']
    }

    const { name, email, password, confirmPassword, formState, isFormValid, onInputChange } = useForm(initialForm, formRules);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmited(true);

        // Don't send to the backend!
        if (!isFormValid || !accountType) return;

        // Login to Firebase
        dispatch(startCreatingUserWithEmailPassword(name, email, password, accountType));
    }

    // Check if the passwords match and set the flag
    useEffect(() => {
        if (password === confirmPassword) {
            setPasswordsMatch(true)
        } else {
            setPasswordsMatch(false)
        }
    }, [password, confirmPassword]);

    console.log(accountType)

    return (
        <>
            <Divider className='cursor-pointer transition ease-in-out text-gray-500 hover:text-gray-900' onClick={() => setisRegisterOpen(true)}>or Register Here!</Divider>
            <Dialog open={isRegisterOpen} onClose={() => setisRegisterOpen(false)} static={true}>
                <DialogPanel>
                    <Title className="mb-3 text-center">Register</Title>
                    <form
                        className="mt-6"
                        onSubmit={onSubmit}
                        aria-label="register-form"
                    >
                        <label
                            htmlFor="name"
                            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                        >
                            Name
                        </label>
                        <TextInput
                            type="input"
                            id="name"
                            icon={''}
                            name="name"
                            placeholder="Your name"
                            className="mt-2 mb-2"
                            value={name}
                            onChange={onInputChange}
                        />
                        <label
                            htmlFor="email"
                            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                        >
                            Email
                        </label>
                        <TextInput
                            type="email"
                            id="email"
                            icon={''}
                            name="email"
                            autoComplete="email"
                            placeholder="Your email"
                            className="mt-2 mb-2"
                            value={email}
                            onChange={onInputChange}
                        />
                        <label
                            htmlFor="accountType"
                            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                        >
                            Account Type
                        </label>

                        <Select
                            className="mt-2 mb-2"
                            placeholder="Select an account type"
                            id="accountType"
                            name="accountType"
                            value={accountType}
                            onChange={setAccountType}
                        >
                            <SelectItem value="teacher">Teacher</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                        </Select>

                        <label
                            htmlFor="password"
                            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                        >
                            Password
                        </label>
                        <TextInput
                            type="password"
                            id="password"
                            icon={''}
                            name="password"
                            autoComplete="password"
                            placeholder="Type your password"
                            className="mt-2 mb-2"
                            value={password}
                            onChange={onInputChange}
                            error={!passwordsMatch ? 'Passwords do not match' : ''}
                        />
                        <label
                            htmlFor="password"
                            className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                        >
                            Confirm Password
                        </label>
                        <TextInput
                            type="password"
                            id="confirmPassword"
                            icon={''}
                            name="confirmPassword"
                            placeholder="Type your password again"
                            className="mt-2 mb-2"
                            value={confirmPassword}
                            onChange={onInputChange}
                        />
                        <div className="mt-3">
                            <Button
                                variant="primary"
                                type="submit"
                                className="mt-4 w-full whitespace-nowrap"
                                disabled={isFormValid && passwordsMatch && accountType ? false : true}
                            >
                                Register
                            </Button>
                        </div>
                    </form>
                </DialogPanel>
            </Dialog>
        </>
    )
}
