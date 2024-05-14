import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { setResults } from "@/store/quizzes";
import insertAt from "@/helpers/insertAt";

const getLocalQuizTimeLeft = quizID => {
    const finishTime = localStorage.getItem(`${quizID}-quizFinishTime`);
    if (!finishTime) {
        return null;
    }
    const timeLeft = Math.round((Number.parseInt(finishTime) - Date.now()) / 1000);
    return Math.max(timeLeft, -1);
}

const getLocalQuizAnswers = quizID => {
    const answers = localStorage.getItem(`${quizID}-quizAnswers`);
    if (!answers) {
        return null;
    }
    return JSON.parse(answers);
}

const setLocalQuizTimeLeft = (quizID, timeLeft) => {
    const quizFinishTimeKey = `${quizID}-quizFinishTime`;
    const quizFinishTime = Date.now() + timeLeft * 1000;
    const quizFinishTimeString = JSON.stringify(quizFinishTime);
    localStorage.setItem(quizFinishTimeKey, quizFinishTimeString);
}

const setLocalQuizAnswers = (quizID, answers) => {
    const quizAnswersKey = `${quizID}-quizAnswers`;
    const quizAnswersString = JSON.stringify(answers);
    localStorage.setItem(quizAnswersKey, quizAnswersString);
}

const removeLocalQuizTimeLeft = quizID => {
    localStorage.removeItem(`${quizID}-quizFinishTime`)
}   

const removeLocalQuizAnswers = quizID => {
    localStorage.removeItem(`${quizID}-quizAnswers`)
}

const useQuizAnswer = ({
    quiz,
    onQuizSubmitting = quiz => {},
    onTimeExpire = () => {},
}) => {

    const dispatch = useDispatch();

    const [quizTimeLeft, setQuizTimeLeft] = useState(getLocalQuizTimeLeft(quiz.QUIZZ_ID));
    const [quizAnswers, setQuizAnswers] = useState(getLocalQuizAnswers(quiz.QUIZZ_ID));
    const [quizDataLoaded, setQuizDataLoaded] = useState(Boolean(quizTimeLeft && quizAnswers));

    const [quizSubmitting, setQuizSubmitting] = useState(false);

    const onQuizAnswerChange = (index, id) => event => {
        const answer = {...quizAnswers[index], chosenAnswer: id};
        setQuizAnswers(insertAt(quizAnswers, index, answer));
    }

    const onQuizSubmit = event => {
        setQuizSubmitting(true);
    }

    useEffect(() => {
        const quizID = quiz.QUIZZ_ID;
        if (getLocalQuizTimeLeft(quizID) === null) {
            const quizTimeLeft = quiz.LIMIT_TIME * 60
            setQuizTimeLeft(quizTimeLeft);
            setLocalQuizTimeLeft(quizID, quizTimeLeft);
        } 
        if (getLocalQuizAnswers(quiz.QUIZZ_ID) === null) {
            const quizAnswers = quiz.QUESTIONS.map(_ => ({chosenAnswer: null}))
            setQuizAnswers(quizAnswers);
            setLocalQuizAnswers(quizID, quizAnswers)
        }
        setQuizDataLoaded(true);
    }, [quiz]);

    useEffect(() => {
        if (!quizAnswers) {
            return;
        }
        const quizID = quiz.QUIZZ_ID;
        setLocalQuizAnswers(quizID, quizAnswers);
    }, [quizAnswers]);

    useEffect(() => {
        if (quizTimeLeft < 0) {
            return;
        }
        else if (quizTimeLeft > 0) {
            const timeoutID = setTimeout(() => {
                setQuizTimeLeft(quizTimeLeft - 1);
            }, 1000);
            return () => clearTimeout(timeoutID);
        } 
        else if (quizTimeLeft === 0) {
            setQuizSubmitting(true);
            setQuizTimeLeft(-1);
            onTimeExpire();
        }
    }, [quizTimeLeft]);

    useEffect(() => {
        if (!quizSubmitting) {
            return;
        }
        const correctAnswers = quizAnswers.filter((answer, i) => (
            answer.chosenAnswer === quiz.QUESTIONS[i].correctAnswer
        ));
        const correctAnswersCount = correctAnswers.length;
        const results = Math.round(correctAnswersCount / quizAnswers.length * 1000) / 100;
        const quizSubmission = {
            answers: quizAnswers,
            results: results,
            isComplete: true,
        }
        const quizID = quiz.QUIZZ_ID;
        removeLocalQuizTimeLeft(quizID);
        removeLocalQuizAnswers(quizID);
        onQuizSubmitting(quizSubmission);
        setQuizSubmitting(false);
        dispatch(setResults(results));
    }, [quizSubmitting]);

    const handlers = {
        onQuizSubmit: onQuizSubmit,
        onQuizAnswerChange: onQuizAnswerChange,
    }

    const state = {
        quizAnswers: quizAnswers,
        quizSubmitting: quizSubmitting,
        quizTimeLeft: quizTimeLeft,
        quizDataLoaded: quizDataLoaded,
    }

    const bag = {
        ...handlers,
        ...state,
    }

    return bag;

}

export default useQuizAnswer;