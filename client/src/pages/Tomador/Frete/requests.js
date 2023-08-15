import axios from "axios";
import {baseUrl} from "../../../App.jsx";

export async function editFrete (frete, token) {
    delete frete.Candidatura
    delete frete.updatedAt
    delete frete.createdAt

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

export async function updateCandidaturaAceitaRequest (candidaturaId, token) {
    try {
        const { data } = await axios.patch(`${baseUrl}/api/candidaturas/candidatura/${candidaturaId}/aceita`, {}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (e) {
        throw e
    }
}

export async function updateCandidaturaRecusadaRequest (candidaturaId, token) {
    try {
        const { data } = await axios.patch(`${baseUrl}/api/candidaturas/candidatura/${candidaturaId}/recusada`, {}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (e) {
        throw e
    }
}
