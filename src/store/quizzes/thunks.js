/* eslint-disable no-unused-vars */
import { api } from "../../api";
import { getCurrentUserToken } from "../../firebase/providers";
import { deleteQuizz, isDeletingQuizz, setActiveGroup } from "../teachers";
import {
  setQuiz,
  sendingQuizzAnswers,
  setErrorMessage,
  setGif,
} from "./quizzesSlice";

export const startQuizz = (quizzId, qwikzgroupId) => {
  return async (dispatch) => {
    try {
      // Retrieves the current user's token to send it to the Flask backend and verify the user's identity
      const token = await getCurrentUserToken();

      const queryQuizz = {
        QUIZZ_ID: quizzId,
        QWIKZGROUP_ID: qwikzgroupId,
      };

      console.log("Llamando a la API para obtener el cuestionario");

      // Calls the Flask-Axios backend to create the group using the token
      const resp = await api.post(
        "/quizz/get_quizz",
        {
          queryQuizz,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const quiz = Array.isArray(resp.data) ? resp.data[0] : resp.data;

      dispatch(setQuiz(quiz));
      return quiz;
    } catch (error) {
      // return dispatch(setErrorMessage(error.message));
    }
  };
};

export const startDummyQuizz = (quizzId, qwikzgroupId) => {
  return async (dispatch) => {
    const quiz = {
      QUIZZ_ID: "YYTR-777",
      QUIZZ_NAME: "Mi Examen",
      QWIKZGROUP_ID: 1,
      QUIZZ_APPLICATION_ID: 1,
      DISPLAY_NAME: "Jorge Student",
      EMAIL: "jorgestudent@gmail.com",
      GROUP_NAME: "GrupoTest2",
      IS_COMPLETED: false,
      LIMIT_TIME: 0.5,
      MAX_RETRY: 1,
      QUESTIONS: [
        {
          question: "¿Quién es el MVP del equipo de DevOps?",
          answers: ["Yorch", "Leobardo", "Luis Mano", "Todos"],
          correctAnswer: 2,
          imageURL: "https://cdn-icons-png.flaticon.com/512/4868/4868616.png",
        },
        {
          question: "¿Cuál es la materia más qlera de Ing. en Compu?",
          answers: [
            "Igualdad de Género",
            "Bases de Datos Avanzadas",
            "Todas las de electricidad alv",
            "Química",
          ],
          correctAnswer: 0,
          imageURL:
            "https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/1024px/1f92e.png",
        },
        {
          question: "¿Paro?",
          answers: ["Si", "No", "Indefinido", "No se"],
          correctAnswer: 2,
          imageURL:
            "https://seeklogo.com/images/U/UNAM-logo-2CFF941801-seeklogo.com.png",
        },
      ],
    };

    dispatch(setQuiz(quiz));

    return quiz;
  };
};

export const getGifFromScore = (score) => {
  return async (dispatch) => {
    try {
      const token = await getCurrentUserToken();
      const resp = await api.post(
        "/quizz/get_gif",
        {
          score: score,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );
      const gifBlob = resp.data;
      const gifUrl = URL.createObjectURL(gifBlob);
      dispatch(setGif(gifUrl));
      return gifUrl;
    } catch (error) {
      dispatch(setErrorMessage(error.message));
    }
  };
};

export const queryQuizzResults = (quizzId) => {
  return async (dispatch) => {
    try {
      // Retrieves the current user's token to send it to the Flask backend and verify the user's identity
      const token = await getCurrentUserToken();

      const queryQuizz = {
        QUIZZ_ID: quizzId,
      };

      const resp = await api.post(
        "/quizz/get_quizz_results",
        {
          QUIZZ_ID: quizzId,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return resp.data;
    } catch (error) {
      return dispatch(setErrorMessage(error.message));
    }
  };
};

export const submitQuizz = (quizz) => {
  return async (dispatch) => {
    dispatch(sendingQuizzAnswers(true));

    try {
      // Retrieves the current user's token to send it to the Flask backend and verify the user's identity
      const token = await getCurrentUserToken();

      console.log("Envío a API", quizz);

      const resp = await api.post(
        "/quizz/score_quizz",
        {
          quizz,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (resp.status === 200) {
        dispatch(sendingQuizzAnswers(false));
        return true; // Indicar que la operación fue exitosa
      } else {
        console.log(resp.data.message);
        dispatch(sendingQuizzAnswers(false));
        return false; // Indicar que la operación falló
      }
    } catch (error) {
      dispatch(setErrorMessage(error.message));
      dispatch(sendingQuizzAnswers(false));
      return false; // Indicar que la operación falló
    }
  };
};

export const startDeletingQuizz = (quizzId) => {
  return async (dispatch) => {
    try {
      dispatch(isDeletingQuizz());

      // Retrieves the current user's token to send it to the Flask backend and verify the user's identity
      const token = await getCurrentUserToken();

      const resp = await api.post(
        "/quizz/delete",
        {
          quizzId,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Respuesta de la API", resp.data);

      dispatch(deleteQuizz(quizzId));
      dispatch(setActiveGroup(null));

      return resp.data;
    } catch (error) {
      return dispatch(setErrorMessage(error.message));
    }
  };
};
