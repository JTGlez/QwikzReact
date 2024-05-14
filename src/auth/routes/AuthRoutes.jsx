import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages";
import { HomePage } from "../pages";
import { RegisterPage } from "../pages/RegisterPage";

export const AuthRoutes = () => {
    return (

        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}