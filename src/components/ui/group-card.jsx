/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { setActiveGroup } from "@/store/teachers";
import { setActiveGroup as setActiveStudentGroup } from "@/store/students";
import {
    Card,
    CardTitle,
    CardDescription,
    CardHeader,
} from '@/components/ui/card'

export default function GroupCard({ GROUP_CODE, GROUP_NAME }) {

    const dispatch = useDispatch();

    const { accountType } = useSelector(state => state.auth);
    const { groups } = useSelector(state => state.teachers);
    const { groups: studentGroups } = useSelector(state => state.students);

    const handleGroupClick = () => {

        // Dispatch the action to set the active group
        // First, we need to query the group data from the groups array
        //* The queries are case sensitive! Check the keys in the redux state
        if (accountType === "student") {
            const selectedGroup = studentGroups.find(groups => groups.GROUP_CODE === GROUP_CODE)
            dispatch(setActiveStudentGroup(selectedGroup));
        } else if (accountType === "teacher") {
            const selectedGroup = groups.find(groups => groups.GROUP_CODE === GROUP_CODE)
            dispatch(setActiveGroup(selectedGroup));
        }
    }

    return (
        <a onClick={handleGroupClick}>
            <Card className='w-[300px] cursor-pointer'>
                <img
                    src={'https://cdn2.excelsior.com.mx/media/pictures/2022/09/22/2827457.jpg'}
                    alt='Group Image'
                    width={300}
                    height={168}
                    className='aspect-video object-cover rounded-t-md'
                />
                <CardHeader>
                    <CardTitle>{GROUP_NAME}</CardTitle>
                    <CardDescription>{GROUP_CODE}</CardDescription>
                </CardHeader>
            </Card>
        </a>
    )
}
