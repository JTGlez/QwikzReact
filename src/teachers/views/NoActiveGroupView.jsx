/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
// import { GroupCard } from "../components/GroupCard/GroupCard"
import GroupCard from "@/components/ui/group-card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import AddQuiz from "../components/AddQuiz";

export const NoActiveGroupView = () => {

    const dispatch = useDispatch();
    const { groups } = useSelector(state => state.teachers);

    const [quizDialogOpen, setQuizDialogOpen] = useState(false);

    const onQuizSubmitted = () => {
        // dispatch();
        setQuizDialogOpen(false);
    }

    if (!groups.length) {
        return (<div className="flex justify-center items-center h-[80vh] flex-col gap-2">
            <p className="text-lg font-semibold text-center text-gray-400">
                Create an active group to start teaching!
            </p>
            <div className="text-lg font-semibold text-center text-gray-400">
                <Dialog open={quizDialogOpen} onOpenChange={setQuizDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Agrega cuestionarios</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[60rem]">
                        <DialogHeader>
                            <DialogTitle>Nuevo Cuestionario</DialogTitle>
                            <DialogDescription>
                                A continuación puede crear un nuevo cuestionario
                            </DialogDescription>
                            <AddQuiz onQuizSubmitted={onQuizSubmitted}/>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>)
    }

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
