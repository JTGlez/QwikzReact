/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { setActiveGroup } from "../../../store/teachers/teachersSlice";
import { setActiveGroup as setActiveStudentGroup } from "../../../store/students/studentsSlice";

export const GroupCard = ({ access_token, group_code, group_name }) => {

    const dispatch = useDispatch();

    const { accountType } = useSelector(state => state.auth);
    const { groups } = useSelector(state => state.teachers);
    const { groups: studentGroups } = useSelector(state => state.students);

    console.log(accountType)

    const handleGroupClick = () => {

        // Dispatch the action to set the active group
        // First, we need to query the group data from the groups array
        if (accountType === "student") {
            const selectedGroup = studentGroups.find(groups => groups.group_code === group_code)
            dispatch(setActiveStudentGroup(selectedGroup));
        } else if (accountType === "teacher") {
            const selectedGroup = groups.find(groups => groups.group_code === group_code)
            dispatch(setActiveGroup(selectedGroup));
        }
    }


    return (
        <div className="flex flex-col min-h-0 border border-gray-200 rounded-lg dark:border-gray-800">
            <a className="flex-1 min-h-0 overflow-hidden cursor-pointer" onClick={handleGroupClick}>
                <div className="flex-shrink-0 aspect-16/9">
                    <img
                        alt="Image"
                        className="object-cover w-full"
                        height={216}
                        src="https://cdn2.excelsior.com.mx/media/pictures/2022/09/22/2827457.jpg"
                        style={{
                            aspectRatio: "384/216",
                            objectFit: "cover",
                        }}
                        width={384}
                    />
                </div>
                <div className="p-2 grid gap-2">
                    <h4 className="text-base font-semibold line-clamp-1">{group_name}</h4>
                    <div className="flex items-center gap-2 text-xs">
                        <p className="text-gray-500 dark:text-gray-400">{group_code}</p>
                    </div>
                </div>
            </a>
        </div>
    )
}
