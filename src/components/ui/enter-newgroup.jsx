/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DialogFooter } from "./dialog"
import { startCreatingGroup } from "@/store/teachers/thunks"

const formSchema = z.object({
    groupName: z.string()
        .min(1, { message: 'Invalid group name' }) // Asegúrate de ajustar el mínimo de caracteres según tus necesidades
        .regex(/^[a-zA-Z0-9\-/\sñáéíóúÁÉÍÓÚ]+$/u, { message: 'Invalid characters in group name' }),
})

export const NewGroup = ({ closeDialog }) => {

    const dispatch = useDispatch();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            groupName: ''
        },
    })

    function onSubmit(values) {
        dispatch(startCreatingGroup(values.groupName))
        closeDialog();
    }

    return (
        <>
            <Form {...form} className="grid gap-4 py-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 pt-4'>
                    <FormField
                        control={form.control}
                        name='groupName'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type='text'
                                        {...field}
                                        placeholder='Enter group name...'
                                        maxLength={50}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button type="submit">Create Group</Button>
                    </DialogFooter>
                </form>
            </Form>
        </>
    )
}