/* eslint-disable no-unused-vars */

import { useDispatch, useSelector } from "react-redux"
import { TeachersLayout } from "../layout/TeachersLayout"
import { ActiveGroupView } from "../views/ActiveGroupView";
import { NoActiveGroupView } from "../views/NoActiveGroupView";

export const TeachersPage = () => {

    const dispatch = useDispatch();
    const { isSaving, activeGroup } = useSelector(state => state.teachers);

    return (
        <TeachersLayout>

            {
                activeGroup
                    ? <ActiveGroupView />
                    : <NoActiveGroupView />
            }

        </TeachersLayout>
    )
}