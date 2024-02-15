/* eslint-disable no-unused-vars */

import { useDispatch, useSelector } from "react-redux"
import { TeachersLayout } from "../layout/TeachersLayout"

export const TeachersPage = () => {

    const dispatch = useDispatch();
    const { isSaving, active } = useSelector(state => state.teachers);


    return (
        <TeachersLayout>
            <h1>Hola Teacher!</h1>
        </TeachersLayout>
    )
}