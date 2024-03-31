import { useSelector } from "react-redux";
import GroupCard from "@/components/ui/group-card";

export const NoActiveStudentGroupView = () => {

    const { groups } = useSelector(state => state.students);

    return (
        <section className="grid md:grid-cols-2 gap-6 xl:grid-cols-3 pl-10 pt-10 pr-10">
            {groups.map((group, key) => (
                <GroupCard key={key} {...group} />
            ))}
        </section>
    )
}