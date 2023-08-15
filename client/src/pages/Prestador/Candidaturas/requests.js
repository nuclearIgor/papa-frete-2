import axios from "axios";
import {baseUrl} from "../../../App.jsx";

export async function fetchCandidaturas (token) {
    try {
        const { data } = await axios.get(`${baseUrl}/api/candidaturas/prestador/me`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (e) {
        throw e
    }
}