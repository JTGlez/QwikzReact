import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./button"
import { Trash } from "lucide-react"
import { CheckCheckIcon } from "lucide-react"

const invoices = [
    {
        quizzCode: "FIDA-1234",
        quizzName: new Date().toLocaleDateString(),
        creationDate: new Date().toLocaleDateString(),
    },
    {
        quizzCode: "Leonardo Said Cruz Rangel",
        quizzName: new Date().toLocaleDateString(),
        creationDate: new Date().toLocaleDateString(),
    },
    {
        quizzCode: "Luis Mano Cervantes Nava",
        quizzName: new Date().toLocaleDateString(),
        creationDate: new Date().toLocaleDateString(),
    }
]

export const Quizzlist = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Fecha de Ingreso</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell>
                            <TableCell>{invoice.quizzCode}</TableCell>
                        </TableCell>
                        <TableCell>{invoice.quizzName}</TableCell>
                        <TableCell className="">{invoice.creationDate}</TableCell>
                        <TableCell>
                            <div className="flex gap-4 justify-end">
                                <Button variant="secondary" size="icon">
                                    <CheckCheckIcon className="h-4 w-4" />
                                </Button>
                                <Button variant="destructive" size="icon">
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
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
