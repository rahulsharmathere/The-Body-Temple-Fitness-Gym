import axios from 'axios'
import { API_BASE } from '../../../api/base'

const expiringSoon = async () => {
    try {
        const response = await axios.get(`${API_BASE}/memberships/expiring-soon?fromDays=0&toDays=7`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log("Error fetching data ", error)
        throw error;
    }
}

const expired = async () => {
    try {
        const response = await axios.get(`${API_BASE}/memberships/expired`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log("Error fetching data ", error)
        throw error;
    }
}

export { expiringSoon, expired };
