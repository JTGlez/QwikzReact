import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "./button"
import { Trash } from "lucide-react"

const invoices = [
    {
        studentName: "Jorge Luis Téllez González",
        enrollement: new Date().toLocaleDateString(),
        paymentMethod: "Credit Card",
    },
    {
        studentName: "Leonardo Said Cruz Rangel",
        enrollement: new Date().toLocaleDateString(),
        paymentMethod: "PayPal",
    },
    {
        studentName: "Luis Mano Cervantes Nava",
        enrollement: new Date().toLocaleDateString(),
        paymentMethod: "Bank Transfer",
    }
]

export const StudentList = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Avatar</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Fecha de Creación</TableHead>
                    <TableHead className="text-right">¿Eliminar?</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{invoice.studentName}</TableCell>
                        <TableCell className="">{invoice.enrollement}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="destructive" size="icon">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}