/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux"
import { TeachersLayout } from "../layout/TeachersLayout"
import { ActiveGroupView } from "../views/ActiveGroupView";
import { NoActiveGroupView } from "../views/NoActiveGroupView";

export const TeachersPage = () => {

    const { activeGroup } = useSelector(state => state.teachers);

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