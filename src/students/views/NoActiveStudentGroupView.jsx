import { useSelector } from "react-redux";
import GroupCard from "@/components/ui/group-card";

export const NoActiveStudentGroupView = () => {

    const { groups } = useSelector(state => state.students);

    if (!groups.length) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <p className="text-lg font-semibold text-center text-gray-400">
                    Join a group to start learning!
                </p>
            </div>
        )
    }

    return (
        <section className="grid md:grid-cols-2 gap-6 xl:grid-cols-3 pl-10 pt-10 pr-10">
            {groups.map((group, key) => (
                <GroupCard key={key} {...group} />
            ))}
        </section>
    )
}