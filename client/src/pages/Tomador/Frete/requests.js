import axios from "axios";
import {baseUrl} from "../../../App.jsx";

export async function editFrete (frete, token) {
    try {
        const { data } = await axios.patch(`${baseUrl}/api/fretes/update/${frete.id}`, frete, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (e) {
        throw e
    }
}

export async function deleteFrete(freteId, token) {

    try {
        const { data } = await axios.delete(`${baseUrl}/api/fretes/delete/${freteId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (e) {
        throw e
    }
}
