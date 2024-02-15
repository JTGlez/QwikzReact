/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextInput, Title } from "@tremor/react";
import { useForm } from "../../../hooks";
import { startCreatingGroup } from "../../../store/teachers/thunks";
import { startAddingGroup } from "../../../store/students/thunks";

const initialForm = {
    accessToken: '',
}

export default function AddGroup() {

    // useState flag to show the form has been submited
    const [formSubmited, setFormSubmited] = useState(false);

    // Redux hooks to dispatch actions and get the auth state from the store
    const dispatch = useDispatch();

    const formRules = {
        accessToken: [(value) => value.length >= 6, 'acessToken must have min 14 characters'],
    }

    const { accessToken, isFormValid, onInputChange } = useForm(initialForm, formRules);

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmited(true);

        // Don't send to the backend!
        if (!isFormValid) return;

        console.log(accessToken)

        // Dispatch the action to create the group
        dispatch(startAddingGroup(accessToken));

    }

    return (
        <form
            className="mt-6"
            onSubmit={(e) => onSubmit(e)}
            aria-label="login-form"
        >
            <Title className="mb-3 text-center">Unirse a un grupo</Title>

            <label
                htmlFor="email"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
                Código de acceso
            </label>
            <TextInput
                type="name"
                icon={''}
                id="accessToken"
                name="accessToken"
                placeholder="Nombre del grupo"
                className="mt-2 mb-2"
                value={accessToken}
                onChange={onInputChange}
            />
            <Button
                variant="primary"
                type="submit"
                className="mt-4 w-full"
                disabled={!isFormValid}
            >
                Unirse
            </Button>
        </form>
    )
}