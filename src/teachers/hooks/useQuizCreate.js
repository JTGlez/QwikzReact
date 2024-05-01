import { useState, useEffect } from "react";
import fileUpload from "@/helpers/fileUpload";
import insertAt from "@/helpers/insertAt";
import removeAt from "@/helpers/removeAt";

const defaultQuestion = {
    question: "", 
    answers: ["", "", "", ""],
    correctAnswer: 0,
    file: null,
    imageURL: "",
}

const useQuizCreate = ({
    onQuizSubmitting = () => {},
    onQuizSubmitted = () => {},
}) => {

    const [questions, setQuestions] = useState([defaultQuestion]);
    
    const [quizImagesUploading, setQuizImagesUploading] = useState(false);
    const [quizSubmitting, setQuizSubmitting] = useState(false);
    const [quizSubmitted, setQuizSubmitted] = useState(false);

    const onQuestionChange = index => event => {
        const question = {...questions[index], question: event.target.value};
        setQuestions(insertAt(questions, index, question));
    }

    const onQuestionAnswerChange = (index, id) => event => {
        const answersBefore = questions[index].answers;
        const answers = insertAt(answersBefore, id, event.target.value);
        const question = {...questions[index], answers: answers};
        setQuestions(insertAt(questions, index, question));
    }

    const onQuestionCorrectAnswerSelect = (index, id) => event => {
        const question = {...questions[index], correctAnswer: id};
        setQuestions(insertAt(questions, index, question));
    }

    const onQuestionFileChange = index => event => {
        if (!event.target.files) {
            return;
        }
        const question = {...questions[index], file: event.target.files[0]};
        setQuestions(insertAt(questions, index, question));
    }

    const onQuestionAdd = event => {
        const question = {...defaultQuestion};
        setQuestions(insertAt(questions, questions.length, question));
    }

    const onQuestionRemove = index => event => {
        if (questions.length === 1) {
            return;
        }
        setQuestions(removeAt(questions, index));
    }

    const onQuizSubmit = event => {
        setQuizImagesUploading(true);
        setQuizSubmitted(false);
    }

    useEffect(() => {
        if (!quizImagesUploading) {
            return;
        }
        const indices = questions.map((_, i) => i).filter(i => questions[i].file);
        const files = indices.map(i => questions[i].file);
        const urls = Promise.all(files.map(fileUpload));
        urls.then(urls => {
            const questionsWithUrls = urls.reduce((questionsWithUrls, url, i) => {
                const question = {...questions[i], imageURL: url};
                return insertAt(questionsWithUrls, indices[i], question);
            }, questions);
            setQuestions(questionsWithUrls); 
            setQuizImagesUploading(false);
            setQuizSubmitting(true);
        });
    }, [quizImagesUploading]);

    useEffect(() => {
        if (!quizSubmitting) {
            return;
        }
        const quiz = questions.map(question => {
            const {file, ...quizQuestion} = question;
            return quizQuestion;
        });
        setQuizSubmitting(false);
        onQuizSubmitting(quiz);
        console.log(quiz);
        setQuizSubmitted(true);
    }, [quizSubmitting]);

    useEffect(() => {
        if (!quizSubmitted) {
            return;
        }
        onQuizSubmitted();
        setQuizSubmitted(false);
    }, [quizSubmitted]);

    const handlers = {
        onQuizSubmit: onQuizSubmit,
        onQuestionChange: onQuestionChange,
        onQuestionFileChange: onQuestionFileChange,
        onQuestionAnswerChange: onQuestionAnswerChange,
        onQuestionCorrectAnswerSelect: onQuestionCorrectAnswerSelect,
        onQuestionAdd: onQuestionAdd,
        onQuestionRemove: onQuestionRemove,
    }

    const state = {
        questions: questions,
        quizSubmitting: quizSubmitting,
        quizImagesUploading: quizImagesUploading,
        quizSubmitted: quizSubmitted,
        setQuizSubmitted: setQuizSubmitted,
    }

    const bag = {
        ...state,
        ...handlers
    }

    return bag;

}

export default useQuizCreate;