import { Routes, Route, Navigate } from "react-router-dom";
import { StudentsPage } from "../pages/StudentsPage";

export const StudentsRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<StudentsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
