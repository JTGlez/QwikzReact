import { getCurrentUserToken } from "../firebase/providers";
import { api } from "../api";

export const loadGroups = async () => {

    const token = await getCurrentUserToken();
    if (!token) throw new Error('No token found');

    // Calls the Flask-Axios backend to retrieve the teacher's groups
    const resp = await api.post('/teacher/groups', {
    }, {
        headers: {
            'Authorization': `Bearer ${token.token}`,
            'Content-Type': 'application/json',
        }
    })

    return resp.data;
}