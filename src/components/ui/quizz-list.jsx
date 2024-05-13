/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "./button";
import { Trash } from "lucide-react";
import { CheckCheckIcon } from "lucide-react";
import { startQuizz } from "@/store/quizzes/thunks";

export const QuizzList = ({ quizzes, qwikzgroupId }) => {

    const dispatch = useDispatch();
    const { accountType } = useSelector(state => state.auth);

    console.log("Acciones", accountType);

    // Función para manejar la eliminación de un cuestionario
    const handleDeleteQuizz = (quizzId) => {
        console.log(`Eliminar cuestionario con ID: ${quizzId}`);
        // Aquí podrías agregar la lógica para eliminar el cuestionario
    };

    // Función para manejar el inicio de un cuestionario
    const handleStartQuizz = (quizzId) => {
        console.log(`Iniciar cuestionario con ID: ${quizzId}`);
        dispatch(startQuizz(quizzId, qwikzgroupId));
    };

    console.log("El id", qwikzgroupId)

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Nombre</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Límite de Tiempo (Min.)</TableHead>
                    <TableHead>Intentos Máximos</TableHead>
                    {accountType === 'teacher' && <TableHead className="text-right">¿Eliminar?</TableHead>}
                    {accountType === 'student' && <TableHead className="text-right">Iniciar Cuestionario</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {quizzes && quizzes.length > 0 ? (
                    quizzes.map((quizz) => (
                        <TableRow key={quizz.QUIZZ_ID}>
                            <TableCell>{quizz.QUIZZ_NAME}</TableCell>
                            <TableCell>{quizz.QUIZZ_CODE}</TableCell>
                            <TableCell>{quizz.LIMIT_TIME}</TableCell>
                            <TableCell>{quizz.MAX_RETRY}</TableCell>
                            {accountType === 'teacher' ? (
                                <TableCell className="text-right">
                                    <Button variant="destructive" size="icon" onClick={() => handleDeleteQuizz(quizz.QUIZZ_ID)}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            ) : (
                                <TableCell className="text-right">
                                    <Button variant="secondary" size="icon" onClick={() => handleStartQuizz(quizz.QUIZZ_ID)}>
                                        <CheckCheckIcon className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            No hay cuestionarios disponibles.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}