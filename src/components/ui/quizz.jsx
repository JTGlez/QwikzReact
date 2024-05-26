/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import AnswerQuiz from "@/students/components/AnswerQuiz";
import {
  startQuizz,
  submitQuizz,
  getGifFromScore,
} from "@/store/quizzes/thunks";
import { Button } from "@/components/ui/button";
import { setQuiz, setResults, clearGif } from "@/store/quizzes";

export const QuizzPage = () => {
  const { results, quiz, gif } = useSelector((state) => state.quizzes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quizID, qwikzgroupId } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const getQuiz = async () => {
      console.log("Llamando a la API para hacer refresh del Quizz");
      await dispatch(startQuizz(quizID, qwikzgroupId));
    };
    getQuiz();
  }, [quizID, qwikzgroupId]);

  if (quiz === null) {
    return (
      <div className="col-span-3 flex flex-col items-center text-center m-20">
        <h1 className="scroll-m-20 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          Loading Quiz...
        </h1>
      </div>
    );
  }

  if (results !== null) {
    return (
      <div className="col-span-3 flex flex-col items-center text-center m-20">
        <h1 className="scroll-m-20 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          You got a <span className="text-primary">{results}</span>. Thanks for
          taking this quiz {":)"}
        </h1>
        {gif && <img src={gif} alt="Result GIF" className="mt-4" />}
        <Button
          className="mt-8"
          onClick={() => {
            dispatch(setQuiz(null));
            dispatch(setResults(null));
            dispatch(clearGif());
            navigate("/");
          }}
        >
          Go to Home
        </Button>
      </div>
    );
  }

  const { QUIZZ_APPLICATION_ID } = quiz;

  // submit quiz to api
  const onQuizSubmitting = async (quiz) => {
    const data = {
      QUIZZ_APPLICATION_ID: QUIZZ_APPLICATION_ID,
      ...quiz,
    };
    const success = await dispatch(submitQuizz(data));
    if (success) {
      console.log("Quiz submitted successfully");
      await dispatch(getGifFromScore(quiz.results));
    }
  };

  return (
    <main className="flex-1 flex m-16">
      <div className="container m-auto">
        <div className="col-span-3 flex flex-col items-center text-center">
          <AnswerQuiz quiz={quiz} onQuizSubmitting={onQuizSubmitting} />
        </div>
      </div>
    </main>
  );
};
