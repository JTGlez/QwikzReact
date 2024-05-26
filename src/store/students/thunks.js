/* eslint-disable no-unused-vars */
import { joinNewGroup, joiningNewGroup, setActiveGroup, updateGroup, setGroups, setErrorMessage, leavingNewGroup, leaveNewGroup } from "./studentsSlice";
import { api } from "../../api";
import { getCurrentUserToken } from "../../firebase/providers";
import { loadStudentGroups } from "../../helpers/loadStudentGroups";

export const startAddingGroup = (accessToken) => {

    return async (dispatch) => {

        dispatch(joiningNewGroup());

        try {

            const token = await getCurrentUserToken();

            // Calls the Flask-Axios backend to create the group using the token
            const resp = await api.post('/student/join_group', {
                accessToken: accessToken,
            }, {
                headers: {
                    'Authorization': `Bearer ${token.token}`,
                    'Content-Type': 'application/json',
                }
            })

            console.log("Me estoy uniendo", resp.data)

            dispatch(joinNewGroup(resp.data));
            dispatch(setActiveGroup(resp.data));

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

export const startDeactivatingGroup = (QWIKZGROUP_ID) => {

    return async (dispatch) => {

        dispatch(leavingNewGroup());

        try {

            const token = await getCurrentUserToken();

            // Calls the Flask-Axios backend to create the group using the token
            const resp = await api.post('/student/leave_group', {
                QWIKZGROUP_ID
            }, {
                headers: {
                    'Authorization': `Bearer ${token.token}`,
                    'Content-Type': 'application/json',
                }
            })

            console.log("Me sali del grupo y la API dice", resp.data)

            dispatch(setActiveGroup(null));
            dispatch(leaveNewGroup(QWIKZGROUP_ID));
            
        } catch (error) {
            return null;
        }

    }

}
