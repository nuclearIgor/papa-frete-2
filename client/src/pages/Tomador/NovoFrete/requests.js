import axios from "axios";
import {baseUrl} from "../../../App.jsx";

export async function postNovoFrete (frete, token) {
    try {
        const { data } = await axios.post(`${baseUrl}/api/fretes`,
            frete, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

        return data
    } catch (e) {
        throw e
    }
}