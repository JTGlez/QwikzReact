/* eslint-disable no-unused-vars */
import { Route, Routes, Navigate } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { StudentsRoutes } from "../students/routes/StudentsRoutes";
import { Spinner } from "flowbite-react";
import { TeacherRoutes } from "../teachers/routes/TeacherRoutes";

export const AppRouter = () => {

    const { status, accountType, verificationDone } = useCheckAuth();

    if (!verificationDone) {
        return (
            <div className="flex justify-center h-[100vh] items-center">
                <Spinner aria-label="Default status example" />
            </div>
        );
    }

    return (
        <Routes>

            {/* Login and Register: AuthRoutes is used for every route that starts with auth/ */}
            {
                (status === 'authenticated')
                    ? <Route path="*" element={accountType === 'student' ? <StudentsRoutes /> : <TeacherRoutes/>} />
                    : <Route path="auth/*" element={<AuthRoutes />} />
            }

            {/* If not authenticated, every route will redirect to the login */}
            <Route path='/*' element={<Navigate to='auth/' />} />

        </Routes>
    )
}
