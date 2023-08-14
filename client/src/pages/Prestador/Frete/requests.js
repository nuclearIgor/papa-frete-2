import axios from "axios";
import {baseUrl} from "../../../App.jsx";

export async function fetchFrete (freteId, token) {
    try {
        const { data } = await axios.get(`${baseUrl}/api/fretes/frete/${freteId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (e) {
        throw e
    }
}

export async function postCandidatura (freteId, token) {
    try {
        const { data } = await axios.post(`${baseUrl}/api/candidaturas`, {freteId}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (e) {
        throw e
    }
}