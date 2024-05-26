/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useQuizAnswer from "@/hooks/useQuizAnswer";

export default function AnswerQuiz({
    quiz,
    onQuizSubmitting,
    onTimeExpire,
}) {

    const quizAnswer = useQuizAnswer({
        quiz: quiz,
        onQuizSubmitting: onQuizSubmitting,
        onTimeExpire: onTimeExpire,
    });

    const [questionInSightIndex, setQuestionInSightIndex] = useState(0);

    if (!quizAnswer.quizDataLoaded) {
        return null;
    }

    if (!(quizAnswer.quizTimeLeft > 0)) {
        return <h1 className="scroll-m-20 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            No Time Left, Sorry...
        </h1>
    }

    const questions = quiz.QUESTIONS;

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

    return <Card className='flex flex-col justify-between shadow-md w-[800px] p-10 rounded-lg gap-10'>

        <div className="flex flex-col gap-8 justify-center items-center">
            <div className='flex justify-center items-center flex-col gap-1'>
                <span className='text-xl font-bold'>
                    {quizAnswer.quizTimeLeft} seconds left
                </span>
                <span className='text-xl font-bold'>
                    {questionInSightIndex + 1} / {questions.length}
                </span>
                <p className="text-center">{question.question}</p>
            </div>

            {question.imageURL && <img src={question.imageURL} style={{ height: 150 }} />}
        </div>

        <div className='grid grid-cols-2 gap-5'>
            {question.answers.map((answer, i) => <div key={i} className="flex justify-center">
                <Button
                    className="font-medium text-center text-sm h-auto"
                    onClick={quizAnswer.onQuizAnswerChange(questionInSightIndex, i)}
                    variant={quizAnswer.quizAnswers[questionInSightIndex].chosenAnswer === i ? 'default' : 'outline'}
                >
                    {answer}
                </Button>
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
                onClick={quizAnswer.onQuizSubmit}
            >
                Submit
            </Button >
        </div>

    </Card>

}