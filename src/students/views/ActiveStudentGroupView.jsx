/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { CheckCheckIcon } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { StudentList } from "@/components/ui/student-list";
import { Quizzlist } from "@/components/ui/quizzlist";

export const ActiveStudentGroupView = () => {

    const dispatch = useDispatch();
    const { activeGroup } = useSelector(state => state.students);
    const { STUDENTS } = activeGroup;

    // Verificar si hay estudiantes
    const hasStudents = STUDENTS && STUDENTS.length > 0;

    // Obtener el primer estudiante si hay estudiantes
    const firstStudent = hasStudents ? STUDENTS[0] : null;
    const studentName = firstStudent ? firstStudent.STUDENT_DETAILS.DISPLAY_NAME : "Sin estudiantes";
    const enrollmentDate = firstStudent ? new Date(firstStudent.ENROLLMENT_DATE).toLocaleDateString() : '';

    const { GROUP_CODE, GROUP_NAME } = activeGroup;

    const onDeactivateGroup = () => {
        console.log("Deactivating group", activeGroup)
    }

    return (

        <div className="px-4 mt-3 grid xl:grid-cols-3 items-start gap-4">
            <div className="space-y-4">
                <Card>
                    <div className="flex items-start gap-4 p-6">
                        <img
                            alt="Group logo"
                            className="aspect-square rounded-lg overflow-hidden object-cover"
                            height="96"
                            src="https://francia.unam.mx/wp-content/uploads/2021/10/cropped-Logo-UNAM-Dorado-Square.png"
                            width="96"
                        />
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold">{GROUP_NAME}</h1>
                            <p className="text-gray-500 dark:text-gray-400">{GROUP_CODE}</p>
                        </div>
                    </div>
                    <div className="grid gap-4 p-6">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Salir del grupo</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Salir del grupo</DialogTitle>
                                    <DialogDescription>
                                        ¿Estás seguro de que deseas salir del grupo? No podrás acceder a los cuestionarios nuevamente.
                                    </DialogDescription>
                                    <DialogFooter className="pt-3">
                                        <Button onClick={onDeactivateGroup} variant="destructive">Salir del grupo</Button>
                                    </DialogFooter>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </Card>
                {/* Here we should display the created quizzes */}
                <Card>
                    <div className="flex items-start gap-4 p-6">
                        <h2 className="text-xl font-semibold">Cuestionarios</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <section className="flex justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="space-y-2 leading-none">
                                        <h3 className="font-semibold">Cuestionario 1</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Examen Parcial 1
                                        </p>
                                    </div>
                                </div>
                                {/* To execute actions like viewing quizz results or delete the quizz */}
                                <div className="flex gap-4">
                                    <Button variant="secondary" size="icon">
                                        <CheckCheckIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            </section>
                            <div className="border-t border-gray-200 dark:border-gray-800" />
                            <div className="flex items-center text-center justify-center">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Ver cuestionarios</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[60rem]">
                                        <DialogHeader>
                                            <DialogTitle>Cuestionarios</DialogTitle>
                                            <DialogDescription>
                                                A continuación se muestra la lista de cuestionarios creados para este grupo.
                                            </DialogDescription>
                                            <Quizzlist />
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-start gap-4 p-6">
                        <h2 className="text-xl font-semibold">Integrantes</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {hasStudents ? (
                                <section className="flex justify-between">
                                    <div className="flex items-start gap-4">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-2 leading-none">
                                            <h3 className="font-semibold">{studentName}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Se unió el {enrollmentDate} {/* Mostrar la fecha de inscripción */}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        {/* Aquí podrías agregar acciones adicionales */}
                                    </div>
                                </section>
                            ) : (
                                <div className="flex items-center text-center justify-center">
                                    <p>No hay estudiantes en el grupo. Invita a nuevos estudiantes.</p> {/* Mensaje alternativo */}
                                </div>
                            )}

                            {hasStudents && (
                                <>
                                    <div className="border-t border-gray-200 dark:border-gray-800 flex items-center" />
                                    <div className="flex items-center text-center justify-center">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline">Ver todos los integrantes</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[100vh]">
                                                <DialogHeader>
                                                    <DialogTitle>Integrantes del grupo</DialogTitle>
                                                    <DialogDescription>
                                                        A continuación se muestra la lista de integrantes del grupo.
                                                    </DialogDescription>
                                                    <StudentList students={STUDENTS} /> {/* Mostrar lista de estudiantes */}
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Card>
            </div>
            <div className="space-y-4 md:col-span-2">
                <Card>
                    <div className="flex items-start gap-4 p-6">
                        <h2 className="text-xl font-semibold">Announcements</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="space-y-2 leading-none">
                                    <h3 className="font-semibold">Bienvenido al grupo!</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Este grupo ha sido creado para la asignatura de {GROUP_NAME}. Mantente al pendiente de los cuestionarios por publicar.
                                    </p>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-800" />
                            <div className="flex items-start gap-4">
                                <div className="space-y-2 leading-none">
                                    <h3 className="font-semibold">Homework Reminder</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Se ha publicado un nuevo cuestionario a las {new Date().toLocaleTimeString()} del día de hoy. No olvides realizarlo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="p-6">
                        <h2 className="text-xl font-semibold">Materials</h2>
                    </div>
                    <div className="p-0">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                            <li className="flex items-center justify-between p-4 space-y-2">
                                <div className="flex-1 min-w-0 space-y-1">
                                    <h3 className="text-base font-semibold">Syllabus: Biology 101</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Introduction to the course</p>
                                </div>
                                <a className="ml-2 flex-shrink-0 text-sm underline" href="#">
                                    Download →
                                </a>
                            </li>
                            <li className="flex items-center justify-between p-4 space-y-2">
                                <div className="flex-1 min-w-0 space-y-1">
                                    <h3 className="text-base font-semibold">Lecture Slides: Cell Structure</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Available until Mar 15</p>
                                </div>
                                <a className="ml-2 flex-shrink-0 text-sm underline" href="#">
                                    View →
                                </a>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        </div>
    )
}

function SchoolIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m4 6 8-4 8 4" />
            <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
            <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
            <path d="M18 5v17" />
            <path d="M6 5v17" />
            <circle cx="12" cy="9" r="2" />
        </svg>
    )
}