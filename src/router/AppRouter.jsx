/* eslint-disable no-unused-vars */
import { Route, Routes, Navigate } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { StudentsRoutes } from "../students/routes/StudentsRoutes";


export const AppRouter = () => {

    const { status, verificationDone } = useCheckAuth();

    if (!verificationDone) {
        return "Wait...";
    }

    return (
        <Routes>

            {/* Login and Register: AuthRoutes is used for every route that starts with auth/ */}
            {
                (status === 'authenticated')
                    ? <Route path="*" element={<StudentsRoutes />} />
                    : <Route path="auth/*" element={<AuthRoutes />} />
            }

            {/* If not authenticated, every route will redirect to the login */}
            <Route path='/*' element={<Navigate to='auth/*' />} />

        </Routes>
    )
}
