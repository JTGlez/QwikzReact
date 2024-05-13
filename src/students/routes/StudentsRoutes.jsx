import { Routes, Route, Navigate } from "react-router-dom";
import { StudentsPage } from "../pages/StudentsPage";
import { QuizzPage } from "@/components/ui/quizz";

export const StudentsRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<StudentsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="quizz" element={<QuizzPage />} />
        </Routes>
    )
}