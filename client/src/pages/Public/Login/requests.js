import axios from "axios";
import {baseUrl} from "../../../App.jsx";

export async function login (loginData) {
    try {
        const { data } = await axios.post(`${baseUrl}/api/auth/login`, loginData)
        return data
    } catch (e) {
        if (e.response.status === 401) {
           return 'usuario ou senha incorretos'
        }
        return false
    }
}