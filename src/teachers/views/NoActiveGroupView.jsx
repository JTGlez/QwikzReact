/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux"
// import { GroupCard } from "../components/GroupCard/GroupCard"
import GroupCard from "@/components/ui/group-card";

export const NoActiveGroupView = () => {

    const dispatch = useDispatch();
    const { groups } = useSelector(state => state.teachers);

    return (
        <div className='py-5 px-16 flex gap-y-2 gap-x-4 flex-wrap'>
            {
                groups.map((group, key) => (
                    <GroupCard key={key} {...group} />
                ))
            }

{/*             {groups.map((group, key) => (
                <GroupCard key={key} {...group} />
            ))} */}
        </div>
    )
}
