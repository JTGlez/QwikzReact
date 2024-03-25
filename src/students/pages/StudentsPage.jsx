/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux"
import { StudentsLayout } from "../layout/StudentsLayout"
import { ActiveStudentGroupView } from "../views/ActiveStudentGroupView";
import { NoActiveStudentGroupView } from "../views/NoActiveStudentGroupView";

export const StudentsPage = () => {

    const { isSaving, activeGroup } = useSelector(state => state.students);

    return (
        <StudentsLayout>
            {
                activeGroup
                    ? <ActiveStudentGroupView />
                    : <NoActiveStudentGroupView />
            }
        </StudentsLayout>
    )
}