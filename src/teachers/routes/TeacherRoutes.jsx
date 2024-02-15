import { Routes, Route, Navigate } from "react-router-dom";
import { TeachersPage } from "../pages/TeachersPage";

export const TeacherRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<TeachersPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}