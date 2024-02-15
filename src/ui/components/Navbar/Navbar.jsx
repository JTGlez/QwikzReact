/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Dropdown } from 'flowbite-react';
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogPanel, Button } from "@tremor/react"
import { Button as FlowButton } from "flowbite-react";
import { startLogout } from "../../../store/auth";
import { RiAddCircleLine } from "@remixicon/react";
import CreateGroup from "../../../teachers/components/CreateGroup/CreateGroup";
import AddGroup from "../../../students/components/AddGroup/AddGroup";

const menus = [
    { title: 'Inicio', path: "students" },
    { title: 'Grupos', path: "students/groups" },
    { title: 'Cuestionarios', path: "students/quizz" },
];

const variants = {
    open: { opacity: 1, height: "auto", transition: { when: "beforeChildren" } },
    closed: { opacity: 0, height: 0, transition: { when: "afterChildren" } },
};

const childVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
};

const Navbar = () => {

    const [isClicked, setIsClicked] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    // Load profile picture, name, and email from the store and dispatch for the logout action
    const { photoURL, displayName, email, accountType } = useSelector(state => state.auth);
    const { messageSaved } = useSelector(state => state.teachers);
    const { messageSaved: messageSavedStudent } = useSelector(state => state.students);
    const dispatch = useDispatch();

    const toggleUserMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const onSignOut = () => {
        dispatch(startLogout());
    }

    useEffect(() => {
        if (messageSaved || messageSavedStudent) {
            // Si hay un mensaje de éxito, cierra el diálogo de creación de grupo
            setIsAddOpen(false);

            // Abre el diálogo de confirmación
            setIsConfirmationOpen(true);
        }
    }, [messageSaved, messageSavedStudent]);

    return (
        <>
            {/* Diálogo de creación de grupo */}
            <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} static={true}>
                <DialogPanel>
                    {accountType === "teacher" ? (
                        <CreateGroup />
                    ) : (
                        <AddGroup />
                    )}
                </DialogPanel>
            </Dialog>

            {/* Diálogo de confirmación */}
            <Dialog open={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)} static={true}>
                <DialogPanel>
                    {
                        accountType === "teacher" ? (
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <h2 className="text-2xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">{messageSaved}</h2>
                                <Button variant="primary" color="blue" onClick={() => setIsConfirmationOpen(false)}>Aceptar</Button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <h2 className="text-2xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">{messageSavedStudent}</h2>
                                <Button variant="primary" color="blue" onClick={() => setIsConfirmationOpen(false)}>Aceptar</Button>
                            </div>
                        )
                    }
                </DialogPanel>
            </Dialog>

            <nav className="bg-neutral-50 border-x-gray-200 border-b relative">
                <div className="flex items-center justify-between md:px-8 p-4  ">
                    {/* Logo */}
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://uxwing.com/wp-content/themes/uxwing/download/sport-and-awards/quiz-icon.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Qwikz Flask</span>
                    </a>

                    {/* User actions */}
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-10 flex-row-reverse sm:flex-row">

                        {/* Menu */}
                        <div className="flex items-center gap-5 flex-row">

                            <FlowButton
                                outline
                                pill
                                variant="primary"
                                color="white"
                                size="sm"
                                onClick={() => setIsAddOpen(true)}
                            >
                                <RiAddCircleLine />
                            </FlowButton>

                            <div className={`hidden md:flex md:space-x-6 ${isClicked ? "block" : "hidden"}`}>
                                {menus.map((menu, index) => (
                                    <a
                                        className="text-center text-tremor-subtitle font-semibold text-tremor-content-strong relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-gradient-to-r after:from-[#5EA2EF] after:to-[#0072F5] after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-left"
                                        key={index}
                                        href={`/${menu.path}`}
                                    >
                                        {menu.title}
                                    </a>
                                ))}
                            </div>
                            <div className="md:hidden">
                                <button
                                    className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                                    onClick={() => setIsClicked(!isClicked)}
                                >
                                    <Menu />
                                </button>
                            </div>
                        </div>

                        <Dropdown
                            className="hidden md:block mt-2 z-50 bg-slate-50"
                            label={<Avatar alt="Profile pic" img={photoURL ? photoURL : ""} className="hidden md:block rounded-full" rounded />}
                            arrowIcon={false}
                            inline
                            onClick={toggleUserMenu}
                            aria-expanded={isMenuOpen}
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">{displayName}</span>
                                <span className="block truncate text-sm font-medium">{email}</span>
                            </Dropdown.Header>
                            <Dropdown.Divider />
                            <Button variant="primary" color="red" onClick={onSignOut} className="ml-4 mb-2">
                                Sign out
                            </Button>
                        </Dropdown>

                    </div>
                </div>
                <AnimatePresence>
                    {isClicked && (
                        <motion.div
                            className={`container flex flex-col md:hidden`}
                            variants={variants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className={`flex flex-col md:hidden`}
                                variants={childVariants}
                            >
                                <ul className="pl-6 justify-center items-center my-4 space-y-6 md:flex md:space-x-6 md:space-y-6">
                                    <Avatar alt="Profile pic" img={photoURL ? photoURL : ""} className="rounded-full justify-start" rounded>
                                        <div className="space-y-1 font-medium dark:text-white">
                                            <div>{displayName}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{email}</div>
                                        </div>
                                    </Avatar>
                                    {menus.map((menu, index) => (
                                        <li key={index} className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
                                            <a href={`/${menu.path}`}>
                                                {menu.title}
                                            </a>
                                        </li>
                                    ))}
                                    <Button variant="primary" color="red" onClick={onSignOut} className="mb-2">
                                        Sign out
                                    </Button>
                                </ul>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;