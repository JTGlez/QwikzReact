/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button } from "@tremor/react"
import { Avatar } from "flowbite-react"
import { Dialog, DialogPanel, Title } from "@tremor/react";

export const ActiveGroupView = () => {

    const dispatch = useDispatch();
    const { isSaving, activeGroup } = useSelector(state => state.teachers);
    const { access_token, group_code, group_name } = activeGroup;
    const [isRegisterOpen, setisRegisterOpen] = useState(false);

    return (
        <>
            <Dialog open={isRegisterOpen} onClose={() => setisRegisterOpen(false)} static={true}>
                <DialogPanel>
                    <Title className="mb-3 text-center">{access_token}</Title>
                </DialogPanel>
            </Dialog>
            <div className="mt-3 grid xl:grid-cols-3 items-start gap-4">
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
                                <h1 className="text-2xl font-bold">{group_name}</h1>
                                <p className="text-gray-500 dark:text-gray-400">{group_code}</p>
                            </div>
                        </div>
                        <div className="grid gap-4 p-6">
                            <Button icon={SchoolIcon} className=" xl:flex xl:w-full" onClick={() => setisRegisterOpen(true)}>
                                <span>Mostrar código de Invitación</span>
                            </Button>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-start gap-4 p-6">
                            <h2 className="text-xl font-semibold">Cuestionarios</h2>
                            <Button>
                                <span>+</span>
                            </Button>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <Avatar className="w-10 h-10">
                                    </Avatar>
                                    <div className="space-y-2 leading-none">
                                        <h3 className="font-semibold">Cuestionario 1</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Examen Parcial 1
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-800" />
                                <div className="flex items-start gap-4">
                                    <Avatar className="w-10 h-10">
                                    </Avatar>
                                    <div className="space-y-2 leading-none">
                                        <h3 className="font-semibold">Repaso del Tema</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Repaso de los temas vistos en la semana sobre Bases de Datos Relacionales.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="space-y-4 md:col-span-2">
                    <Card>
                        <div className="flex items-start gap-4 p-6">
                            <h2 className="text-xl font-semibold">Announcements</h2>
                            {/*                         <Button size="sm">Create</Button>
 */}                    </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <Avatar className="w-10 h-10">
                                    </Avatar>
                                    <div className="space-y-2 leading-none">
                                        <h3 className="font-semibold">Bienvenido al grupo!</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Este grupo ha sido creado para la asignatura de {group_name}. Mantente al pendiente de los cuestionarios por publicar.
                                        </p>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-800" />
                                <div className="flex items-start gap-4">
                                    <Avatar className="w-10 h-10">
                                    </Avatar>
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
                    <div className="space-y-4">
                        <Card>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold">Assignments</h2>
                            </div>
                            <div className="p-0">
                                <div className="border-t border-gray-200 dark:border-gray-800" />
                                <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                                    <li className="flex items-center justify-between p-4 space-y-2">
                                        <div className="flex-1 min-w-0 space-y-1">
                                            <h3 className="text-base font-semibold">Midterm Exam: Biology 101</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Available until Mar 15</p>
                                        </div>
                                        <a className="ml-2 flex-shrink-0 text-sm underline" href="#">
                                            View →
                                        </a>
                                    </li>
                                    <li className="flex items-center justify-between p-4 space-y-2">
                                        <div className="flex-1 min-w-0 space-y-1">
                                            <h3 className="text-base font-semibold">Lab Report: Photosynthesis</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Available until Mar 22</p>
                                        </div>
                                        <a className="ml-2 flex-shrink-0 text-sm underline" href="#">
                                            View →
                                        </a>
                                    </li>
                                </ul>
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
            </div>
        </>
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