/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import useQuizCreate from "../hooks/useQuizCreate";

const generateQuizCode = (name) => {
    let randomChars = '';
    if (name.length > 3) {
        // Crear un conjunto de índices únicos para seleccionar caracteres al azar del nombre
        let indices = new Set();
        while (indices.size < 3) {
            indices.add(Math.floor(Math.random() * name.length));
        }
        // Construir la cadena de caracteres aleatorios a partir de los índices seleccionados
        randomChars = Array.from(indices).map(index => name[index]).join('');
    } else {
        randomChars = name.padEnd(3, 'X'); // Rellenar con 'X' si el nombre es demasiado corto
    }

    const randomSuffix = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${randomChars}-${randomSuffix}`.toUpperCase(); // Convertir todo el código a mayúsculas
};

export default function AddQuiz({
    onQuizSubmitting,
}) {

    const { questions, ...quizCreate } = useQuizCreate({
        onQuizSubmitting: questions => {
            const quizCode = generateQuizCode(quizName);
            const quizData = {
                QUIZZ_CODE: quizCode,
                QUIZZ_NAME: quizName,
                LIMIT_TIME: timeLimit,
                MAX_RETRY: maxAttempts,
                QUESTIONS: questions,
                QWIKZGROUP_ID: selectedGroupId
            };
            onQuizSubmitting(quizData);
        },
    });

    const [quizName, setQuizName] = useState("");
    const [timeLimit, setTimeLimit] = useState(60);
    const [maxAttempts, setMaxAttempts] = useState(1);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [errors, setErrors] = useState({});
    const [questionInSightIndex, setQuestionInSightIndex] = useState(0);
    const groups = useSelector(state => state.teachers.groups) || [];
    const question = questions[questionInSightIndex];

    const handleSelectGroup = (groupId) => {
        setSelectedGroupId(groupId);
    };

    const validateForm = () => {
        const newErrors = {};
        if (quizName.length <= 3) {
            newErrors.quizName = "El nombre debe tener más de 3 caracteres.";
        }
        if (timeLimit <= 1) {
            newErrors.timeLimit = "El límite de tiempo debe ser mayor que 1 minuto.";
        }
        if (maxAttempts < 1) {
            newErrors.maxAttempts = "El número máximo de intentos no puede ser menor que 1.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

    const handleQuizSubmit = () => {
        if (validateForm()) {
            quizCreate.onQuizSubmit();
        }
    };
    
    return <div className='flex flex-col justify-center shadow-md p-8 rounded-lg gap-6'>

        <Label htmlFor="group">Group</Label>
        <Select onValueChange={handleSelectGroup}>
            <SelectTrigger id="group">
                <SelectValue placeholder="Select Group" />
            </SelectTrigger>
            <SelectContent position="popper">
                {groups.map(group => (
                    <SelectItem
                        key={group.QWIKZGROUP_ID}
                        value={group.QWIKZGROUP_ID}
                    >
                        {group.GROUP_NAME}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

        <Label htmlFor="email" className="mb-[-1rem]">Nombre del cuestionario</Label>
        <Input
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            placeholder="Nombre del Cuestionario"
        />
        {errors.quizName && <p className="text-red-500 mt-[-1.5rem]">{errors.quizName}</p>}
        <Label htmlFor="email" className="mb-[-1rem]">Tiempo de duración</Label>
        <Input
            type="number"
            min="1"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
            placeholder="Límite de tiempo (minutos)"
        />
        {errors.timeLimit && <p className="text-red-500 mt-[-1.5rem]">{errors.timeLimit}</p>}
        <Label htmlFor="email" className="mb-[-1rem]">Límite de Intentos</Label>
        <Input
            type="number"
            value={maxAttempts}
            onChange={(e) => setMaxAttempts(e.target.value)}
            placeholder="Número máximo de intentos"
        />
        {errors.maxAttempts && <p className="text-red-500 mt-[-1.5rem]">{errors.maxAttempts}</p>}

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
                    placeholder={`Aqui respuesta ${i + 1}`}
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
                onClick={handleQuizSubmit}
            >
                Submit
            </Button >
        </div>

    </div>
}