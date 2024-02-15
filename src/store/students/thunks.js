/* eslint-disable no-unused-vars */
import { joinNewGroup, joiningNewGroup, setActiveGroup, updateGroup, setGroups } from "./studentsSlice";
import { api } from "../../api";
import { getCurrentUserToken } from "../../firebase/providers";
import { loadStudentGroups } from "../../helpers/loadStudentGroups";

export const startAddingGroup = (accessToken) => {

    return async (dispatch) => {

        dispatch(joiningNewGroup());

        try {

            const token = await getCurrentUserToken();

            // Calls the Flask-Axios backend to create the group using the token
            const resp = await api.post('/students/joingroup', {
                accessToken: accessToken,
            }, {
                headers: {
                    'Authorization': `Bearer ${token.token}`,
                    'Content-Type': 'application/json',
                }
            })

            dispatch(joinNewGroup(resp.data.group));
            dispatch(setActiveGroup(resp.data.group));

        } catch (error) {
            return null;
        }

    }

}

export const startLoadingStudentGroups = () => {

    return async (dispatch) => {

        const groups = await loadStudentGroups();
        dispatch(setGroups(groups));
    }

}
