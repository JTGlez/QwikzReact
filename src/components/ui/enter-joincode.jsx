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


const formSchema = z.object({
    accessToken: z.string().min(14, { message: 'Invalid access code' }),
})

export const JoinCode = () => {

    // Redux hooks to dispatch actions and get the auth state from the store
    // const dispatch = useDispatch();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            accessToken: ''
        },
    })

    const handleInputChange = (event, field) => {
        let { value } = event.target;
        value = value
            .toUpperCase() 
            .replace(/[^\dA-Z]/g, '') // Delete non-alphanumeric characters
            .replace(/(.{4})/g, '$1-') // Add a hyphen after every 4 characters
            .slice(0, 14); // Limit the length to 14 characters (deletes an extra hyphen at the end)

        if (value.endsWith('-') && value.length !== 15) {
            value = value.slice(0, -1);
        }

        field.onChange(value); // Actualiza el valor del campo con el formato aplicado
    };

    function onSubmit(values) {
        console.log("Joining group with access code: ", values.accessToken)

        // Here we define the dispath action to join the group (calls an async thunk action)
    }

    return (
        <>
            <Form {...form} className="grid gap-4 py-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 pt-4'>
                    <FormField
                        control={form.control}
                        name='accessToken'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type='text'
                                        {...field}
                                        onChange={(e) => handleInputChange(e, field)}
                                        placeholder='XXXX-XXXX-XXXX'
                                        maxLength={14}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button type="submit">Join Group</Button>
                    </DialogFooter>
                </form>
            </Form>
        </>
    )
}