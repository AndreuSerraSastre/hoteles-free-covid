import Axios from 'axios';
import { HOTELES, HOTELESGET, URL } from '../constants';

export const hotelesGet = () => {
    return async dispatch => {
        const response = await Axios.get(`${URL}${HOTELESGET}`, {}, {
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (response.data) {
                dispatch({ type: HOTELES, payload: { hoteles: response.data } });
                return response
            } else {
                return {
                    status: 404,
                    err: "ERROR DE CONEXIÓN CON EL SERVIDOR."
                }
            }
        }).catch(error => {
            return {
                status: 404,
                err: "ERROR DE CONEXIÓN CON EL SERVIDOR."
            }
        })
        return response;
    }
}