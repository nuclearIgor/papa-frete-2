import axios from "axios";
import {baseUrl} from "../../../App.jsx";

export async function fetchMeusFretes (token) {
    try {
        const { data } = await axios.get(`${baseUrl}/api/fretes/me`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (e) {
        throw e
    }
}