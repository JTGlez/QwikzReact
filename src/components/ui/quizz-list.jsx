/* eslint-disable react/prop-types */
import { useState } from "react";
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
import { CheckCircle2Icon, Trash } from "lucide-react";
import { CheckCheckIcon } from "lucide-react";
import { startQuizz, queryQuizzResults } from "@/store/quizzes/thunks";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";

export const QuizzList = ({ quizzes, qwikzgroupId }) => {

    const dispatch = useDispatch();
    const { accountType } = useSelector(state => state.auth);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [quizzResults, setQuizzResults] = useState([]);

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

    const handleQueryResults = async (quizzId) => {
        console.log(`Ver resultados del cuestionario con ID: ${quizzId}`);
        const results = await dispatch(queryQuizzResults(quizzId));
        setQuizzResults(results);
        setIsDrawerOpen(true);
    };

    console.log("El id es", qwikzgroupId)
    console.log(quizzResults)

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Nombre</TableHead>
                        <TableHead>Código</TableHead>
                        <TableHead>Límite de Tiempo (Min.)</TableHead>
                        <TableHead>Intentos Máximos</TableHead>
                        {accountType === 'teacher' && <TableHead className="text-right">Ver Resultados</TableHead>}
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
                                    <>
                                        <TableCell className="text-right">
                                            <Button variant="secondary" size="icon" onClick={() => handleQueryResults(quizz.QUIZZ_ID)}>
                                                <CheckCircle2Icon className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="destructive" size="icon" onClick={() => handleDeleteQuizz(quizz.QUIZZ_ID)}>
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </>
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

            {/* Drawer para mostrar los resultados del cuestionario */}
            {isDrawerOpen && (
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Resultados del Quizz</DrawerTitle>
                            <DrawerDescription>A continuación se muestran las calificaciones registradas para el cuestionario.</DrawerDescription>
                        </DrawerHeader>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Correo</TableHead>
                                    <TableHead>Calificación</TableHead>
                                    <TableHead>¿Examen finalizado?</TableHead>
                                    <TableHead>Número de Intentos</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {quizzResults.map((result) => (
                                    <TableRow key={result.QUIZZ_APPLICATION_ID}>
                                        <TableCell>{result.DISPLAY_NAME}</TableCell>
                                        <TableCell>{result.EMAIL}</TableCell>
                                        <TableCell>{result.RESULTS ? result.RESULTS : 'Sin Calificación'}</TableCell>
                                        <TableCell>{result.IS_COMPLETED ? "Si" : "No"}</TableCell>
                                        <TableCell>{result.RETRY_NUMBER}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button onClick={() => setIsDrawerOpen(false)}>Cerrar</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )}
        </>
    );
}