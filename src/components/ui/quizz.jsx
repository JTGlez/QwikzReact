/* eslint-disable no-unused-vars */

import { useEffect, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setQuestions } from "@/store/quizzes"
import { questions as dummydata } from "@/assets/data"
import { QuestionDisplay } from "./question"

export const QuizzPage = () => {

    const dispatch = useDispatch();

    const { questions, currentQuestionIndex } = useSelector(state => state.quizzes);

    useLayoutEffect(() => {
        // Aquí es donde despachamos la acción para actualizar el estado con las preguntas
        dispatch(setQuestions(dummydata));
    }, [dispatch]);

    console.log("Mis questions: ", questions)

    if (questions.length > 0) {
        return (
            <div
                className='container flex flex-col items-center justify-center gap-10'
                style={{ height: 'calc(100vh - 5rem)' }}
            >
                <QuestionDisplay />
            </div>
        )

    }


    return (
        <div
            className='container flex flex-col items-center justify-center gap-10'
            style={{ height: 'calc(100vh - 5rem)' }}
        >
            hola

        </div>
    )
}
