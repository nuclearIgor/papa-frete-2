import axios from "axios";
import {baseUrl} from "../../App.jsx";

export const fetchPrestador = async (token) => {
    try {
        const { data } = await axios.get(`${baseUrl}/api/prestadores/me`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        return data
    } catch (e) {
        throw e
    }
}