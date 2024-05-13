/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux';
import { setAnswer, setCurrentQuestionIndex, setShowResults } from '@/store/quizzes';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const QuestionDisplay = () => {

    const dispatch = useDispatch();
    const { questions, currentQuestionIndex } = useSelector(state => state.quizzes);
    const currentQuestion = questions[currentQuestionIndex];

    const checkAnswer = (answer) => {
        dispatch(setAnswer({ questionIndex: currentQuestionIndex, answer }));
        if (currentQuestionIndex + 1 < questions.length) {
            dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
        } else {
            dispatch(setShowResults(true));
        }
    };

    const onReset = () => {
        dispatch(setCurrentQuestionIndex(0));
    };

    if (!currentQuestion) return null;

    return (
        <>
            <Card className='flex flex-col justify-between shadow-md w-[600px] h-[600px] p-10 rounded-lg'>
                <div className='flex justify-between'>
                    <span className='text-xl font-bold'>
                        {currentQuestionIndex + 1} / {questions.length}
                    </span>
                </div>

                <Button
                    className='border px-5 py-2 rounded-lg font-bold transition-all hover:bg-yellow-500 hover:text-gray-900'
                    onClick={onReset}
                >
                    Reiniciar
                </Button>
                <div>
                    <h1 className='font-bold text-center'>{currentQuestion.question}</h1>
                </div>
                <div className='grid grid-cols-2 gap-5'>
                    {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(() => Math.random() - 0.5).map((answer, index) => (
                        <button
                            className='border p-5 rounded-lg flex justify-center items-center hover:scale-105'
                            key={index}
                            onClick={() => checkAnswer(answer)}
                        >
                            <p className='font-medium text-center text-sm'>
                                {answer}
                            </p>
                        </button>
                    ))}
                </div>

                {currentQuestionIndex + 1 === questions.length ? (
                    <button
                        className='border-2 border-yellow-600 text-yellow-600 rounded-md px-5 py-2 hover:bg-yellow-600 hover:text-black font-medium'
                        onClick={() => dispatch(setShowResults(true))}
                    >
                        Finalizar
                    </button>
                ) : (
                    <Button
                        className='border-2 border-yellow-600 text-yellow-600 rounded-md px-5 py-2 hover:bg-yellow-600 hover:text-black font-medium'
                        onClick={() => dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1))}
                        variant="outline"
                    >
                        Siguiente Pregunta
                    </Button>
                )}
            </Card>
        </>
    )
}
