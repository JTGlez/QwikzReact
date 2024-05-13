/* eslint-disable no-unused-vars */
import { api } from "../../api";
import { getCurrentUserToken } from "../../firebase/providers";

export const startQuizz = (quizzId, qwikzgroupId) => {

    return async (dispatch) => {

        try {

            // Retrieves the current user's token to send it to the Flask backend and verify the user's identity
            const token = await getCurrentUserToken();

            const queryQuizz = {
                QUIZZ_ID: quizzId,
                QWIKZGROUP_ID: qwikzgroupId
            }

            console.log("Llamando a la API para obtener el cuestionario")

            // Calls the Flask-Axios backend to create the group using the token
            const resp = await api.post('/quizz/get_quizz', {
                queryQuizz,
            }, {
                headers: {
                    'Authorization': `Bearer ${token.token}`,
                    'Content-Type': 'application/json',
                }
            })

            console.log(resp.data)

        } catch (error) {
            // return dispatch(setErrorMessage(error.message));
        }

    }

}

export const queryQuizzResults = (quizzId) => {
    
        return async (dispatch) => {
    
            try {
    
                // Retrieves the current user's token to send it to the Flask backend and verify the user's identity
                const token = await getCurrentUserToken();
    
                const queryQuizz = {
                    QUIZZ_ID: quizzId
                }
    
                const resp = await api.post('/quizz/get_quizz_results', {
                    QUIZZ_ID: quizzId
                }, {
                    headers: {
                        'Authorization': `Bearer ${token.token}`,
                        'Content-Type': 'application/json',
                    }
                });

                return resp.data;
    
            } catch (error) {
                // return dispatch(setErrorMessage(error.message));
            }
    
        }
    
    }
