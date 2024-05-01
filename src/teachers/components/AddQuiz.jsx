import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useQuizCreate from "../hooks/useQuizCreate";

export default function AddQuiz({
    onQuizSubmitting,
    onQuizSubmitted,
}) {

    const {questions, ...quizCreate} = useQuizCreate({
        onQuizSubmitting,
        onQuizSubmitted,
    });

    const [questionInSightIndex, setQuestionInSightIndex] = useState(0);

    const question = questions[questionInSightIndex];

    const onMoveToNextQuestion = event => {
        if (questionInSightIndex === questions.length - 1) {
            return;
        }
        setQuestionInSightIndex(questionInSightIndex + 1);
    }

    const onMoveToPreviousQuestion = event => {
        if (questionInSightIndex === 0) {
            return;
        }
        setQuestionInSightIndex(questionInSightIndex - 1);
    }

    const onQuestionRemove = index => event => {
        quizCreate.onQuestionRemove(index)(event);
        setQuestionInSightIndex(questionInSightIndex > 0 ? questionInSightIndex - 1 : 0);
    }

    const onQuestionAdd = event => {
        quizCreate.onQuestionAdd(event);
        setQuestionInSightIndex(questionInSightIndex);
    }

    return <div className='flex flex-col justify-center shadow-md p-10 rounded-lg gap-10'>

        <div className="flex flex-col gap-3">
            <div className='flex justify-center items-center flex-col gap-1'>
                <span className='text-xl font-bold'>
                    {questionInSightIndex + 1} / {questions.length}
                </span>
                <Input
                    value={question.question}
                    onChange={quizCreate.onQuestionChange(questionInSightIndex)}
                    placeholder="Aqui escribe tu pregunta"
                    className="text-center h-20"
                />
            </div>

            <div className='flex justify-center items-center flex-col gap-1'>
                <Input
                    id="quiz-image"
                    type="file"
                    onChange={quizCreate.onQuestionFileChange(questionInSightIndex)}
                    className="text-center text-transparent"
                />
                {question.file ? 
                    <p className="text-sm"> 
                        {question.file.name || "File Selected"} 
                    </p> : 
                    <p className="text-sm"> 
                        No File Selected 
                    </p>
                }
            </div>
        </div>

        <div className='grid grid-cols-2 gap-5'>
            {question.answers.map((answer, i) => <div key={i} className="flex justify-center">
                <Input
                    value={answer}
                    onChange={quizCreate.onQuestionAnswerChange(questionInSightIndex, i)}
                    placeholder={`Aqui respuesta ${i+1}`}
                    className="font-medium text-center text-sm h-auto"
                />
                <button
                    onClick={quizCreate.onQuestionCorrectAnswerSelect(questionInSightIndex, i)}
                    className="border p-5 rounded-lg flex justify-center items-center hover:scale-105"
                >
                    ✔️
                </button>
            </div>)}
        </div>

        <div className='flex justify-center gap-5'>
            <Button
                disabled={questionInSightIndex === 0}
                onClick={onMoveToPreviousQuestion}
            >
                ⬅️
            </Button>
            <Button 
                disabled={questionInSightIndex === questions.length - 1}
                onClick={onMoveToNextQuestion}
            > 
                ➡️
            </Button >
            <Button 
                onClick={onQuestionAdd}
            > 
                ➕ 
            </Button >
            <Button 
                disabled={questions.length === 1}
                onClick={onQuestionRemove(questionInSightIndex)}
            > 
                ➖
            </Button >
            <Button 
                onClick={quizCreate.onQuizSubmit}
            >
                Submit
            </Button >
        </div>

    </div>
}