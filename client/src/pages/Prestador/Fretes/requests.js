import axios from "axios";
import {baseUrl} from "../../../App.jsx";

export async function fetchFretes (filtros, token) {

    let str = '?'
    let temDataColeta = filtros.dataColetaCheckbox

    for (let i = 0; i < Object.entries(filtros).length; i++){

        if (Object.entries(filtros)[i][0] === 'ufOrigem' && Object.entries(filtros)[i][1] === 'estado') {
            str += ''
        }
        else if (Object.entries(filtros)[i][0] === 'cidadeOrigem' && Object.entries(filtros)[i][1] === 'cidade') {
            str += ''
        }
        else if (Object.entries(filtros)[i][0] === 'ufDestino' && Object.entries(filtros)[i][1] === 'estado') {
            str += ''
        }
        else if (Object.entries(filtros)[i][0] === 'cidadeDestino' && Object.entries(filtros)[i][1] === 'cidade') {
            str += ''
        }


        else if (Object.entries(filtros)[i][0] === 'coletaLivre' && !Object.entries(filtros)[i][1]) {
            str += ''
        }


        else if (Object.entries(filtros)[i][0] === 'dataColetaCheckbox' && Object.entries(filtros)[i][1]) {
            temDataColeta = true
        }
        else if (Object.entries(filtros)[i][0] === 'dataColetaCheckbox' && !Object.entries(filtros)[i][1]) {
            // temDataColeta = false
            str += ''
        }

        else if (Object.entries(filtros)[i][0] === 'startDate'){
             str += temDataColeta ?
                `${Object.entries(filtros)[i][0]}=${Object.entries(filtros)[i][1].toISOString().slice(0, 10)}&`
                : ''
        }

        else {
            str += `${Object.entries(filtros)[i][0]}=${Object.entries(filtros)[i][1]}&`
        }
    }

    const queryParams= str.length > 1 ? str.slice(0, -1) : ''
    console.log('query:\n', queryParams)

    try {
        const { data } = await axios.get(`${baseUrl}/api/fretes${queryParams}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (e) {
        throw e
    }
}