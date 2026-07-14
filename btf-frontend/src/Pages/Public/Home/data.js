import axios from 'axios'
import { API_BASE } from '../../../api/base'

const getGymInfo = async () => {
    try {
        const response = await axios.get(`${API_BASE}/gym-info`);
        return response.data;
    } catch (error) {
        console.log("Error fetching data ", error)
        throw error;
    }
}

const getPlans = async () => {
    try {
        const response = await axios.get(`${API_BASE}/plans`);
        return response.data;
    } catch (error) {
        console.log("Error fetching data ", error)
        throw error;
    }
}

const sendContactMessage = async (payload) => {
    try {
        const response = await axios.post(`${API_BASE}/contact/send`, payload);
        return response.data;
    } catch (error) {
        console.log("Error sending message ", error)
        throw error;
    }
}

export { getGymInfo, getPlans, sendContactMessage };
