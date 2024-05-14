/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import AnswerQuiz from "@/students/components/AnswerQuiz"
import { startDummyQuizz } from "@/store/quizzes/thunks";

export const QuizzPage = () => {

    const { results, quiz } = useSelector(state => state.quizzes);
    const dispatch = useDispatch();

    const { quizID } = useParams();

    useEffect(() => {
        const getQuiz = async () => {
            await dispatch(startDummyQuizz(quizID, null /* group */ ));
        }
        getQuiz();
    }, [quizID]);

    if (quiz === null) {
        return <div className='col-span-3 flex flex-col items-center text-center m-20'>
            <h1 className="scroll-m-20 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"> 
                Loading Quiz...
            </h1>
        </div>
    }

    if (results !== null) {
        return <div className='col-span-3 flex flex-col items-center text-center m-20'>
            <h1 className="scroll-m-20 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                You got a <span className='text-primary'>{results}</span>.
                Thanks for taking this quiz {":)"}
            </h1>
        </div>
    }

    // submit quiz to api
    const onQuizSubmitting = quiz => {
        console.log(quiz);
    }

    return <main className='flex-1 flex m-16'>
        <div className='container m-auto'>
            <div className='col-span-3 flex flex-col items-center text-center'>
                <AnswerQuiz 
                    quiz={quiz}
                    onQuizSubmitting={onQuizSubmitting}
                />
            </div>
        </div>
    </main>

}
