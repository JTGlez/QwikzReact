import { api } from "../api";
import { getCurrentUserToken } from "../firebase/providers";

export const loadGroups = async () => {

    // Retrieves the user's token to send it to the Flask backend
    const token = await getCurrentUserToken();
    if (!token) throw new Error('No token found');

    // Calls the Flask-Axios backend to retrieve the teacher's groups
    const resp = await api.post('/teachers/groups', {

    }, {
        headers: {
            'Authorization': `Bearer ${token.token}`,
            'Content-Type': 'application/json',
        }
    })

    return resp.data;
}