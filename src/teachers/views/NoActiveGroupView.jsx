/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux"
import { GroupCard } from "../components/GroupCard/GroupCard"

export const NoActiveGroupView = () => {

    const dispatch = useDispatch();
    const { groups } = useSelector(state => state.teachers);

    return (
        <section className="grid md:grid-cols-2 gap-6 xl:grid-cols-3 pl-10 pt-10 pr-10">

            {groups.map((group, key) => (
                <GroupCard key={key} {...group} />
            ))}
        </section>
    )
}
