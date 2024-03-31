/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { useToast } from './use-toast'
import { HomeIcon, PlusIcon, ExitIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'
import { startLogout } from '@/store/auth'
import { cleanActiveGroup as cleanActiveGroupTeacher, clearErrorMessage, clearMessageSaved } from '@/store/teachers'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import { NewGroup } from './enter-newgroup'

// Side navigation for teachers
export default function TeacherSideNav() {

    const { messageSaved, errorMessage } = useSelector(state => state.teachers);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const { toast } = useToast()

    const closeDialog = () => setIsDialogOpen(false);

    const onCleanGroup = () => {
        dispatch(cleanActiveGroupTeacher())
    }

    const onSignOut = () => {
        dispatch(startLogout());
    }

    // Display a confirmation toast when the group is created or an error message
    useEffect(() => {
        if (messageSaved) {
            toast({
                title: "Success!",
                description: messageSaved
            })
            dispatch(clearMessageSaved())
        } else if (errorMessage) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorMessage
            })
            dispatch(clearErrorMessage())
        }

    }, [messageSaved, errorMessage])

    return (
        <aside className='min-h-screen space-y-1 flex flex-col col-start-1 col-end-2 py-5 px-1 sticky left-0 z-40 border-r border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <Button asChild variant='ghost' className='md:justify-start'>
                <Link onClick={onCleanGroup}>
                    <HomeIcon className='h-6 w-6 md:mr-2 md:h-5 md:w-5' />
                    <span className='hidden md:block'>Home</span>
                </Link>
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant='ghost' className='md:justify-start'>
                        <PlusIcon className='h-6 w-6 md:mr-2 md:h-5 md:w-5' />
                        <span className='hidden md:block'>Create Group</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Group</DialogTitle>
                        <DialogDescription>
                            Enter the group name you want to create.
                        </DialogDescription>
                        <NewGroup closeDialog={closeDialog} />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <Button asChild variant='ghost' className='md:justify-start'>
                <Link onClick={onSignOut}>
                    <ExitIcon className='h-6 w-6 md:mr-2 md:h-5 md:w-5' />
                    <span className='hidden md:block'>Logout</span>
                </Link>
            </Button>
        </aside>
    )
}