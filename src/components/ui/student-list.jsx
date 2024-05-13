/* eslint-disable react/prop-types */
import {
    Table,
    TableBody,
    TableCell,
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

export const StudentList = ({ students }) => {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Avatar</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Fecha de Ingreso</TableHead>
                    <TableHead>Correo Electrónico</TableHead> {/* Nueva columna para email */}
                    <TableHead className="text-right">¿Eliminar?</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {students && students.length > 0 ? (
                    // Mostrar datos reales de estudiantes
                    students.map((student) => (
                        <TableRow key={student.GROUP_STUDENT_ID}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>{student.STUDENT_DETAILS.DISPLAY_NAME}</TableCell>
                            <TableCell>
                                {new Date(student.ENROLLMENT_DATE).toLocaleDateString()} {/* Formatear fecha */}
                            </TableCell>
                            <TableCell>{student.STUDENT_DETAILS.EMAIL}</TableCell> {/* Correo del estudiante */}
                            <TableCell className="text-right">
                                <Button variant="destructive" size="icon">
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            No hay estudiantes en el grupo. {/* Mensaje cuando no hay estudiantes */}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}