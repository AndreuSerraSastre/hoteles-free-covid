import { DATOSEXTERNOS } from '../constants';
import playasBaleares from './../json/JSONPlayasBaleares.json'
import baresRestaurantes from './../json/Bares-Restaurantes.json'
import fires from './../json/fires.json'
import Axios from 'axios';

export const datosExternosGet = () => {
    return async dispatch => {
        if (playasBaleares) {
            dispatch({ type: DATOSEXTERNOS, payload: playasBaleares });
        }
        if (baresRestaurantes) {
            dispatch({ type: DATOSEXTERNOS, payload: baresRestaurantes });
        }
        if (fires) {
            dispatch({ type: DATOSEXTERNOS, payload: fires });
        }
        const response = await Axios.get(`https://calasdemallorca.netlify.app/_json/datos.json`, {}, {
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (response.data) {
                dispatch({ type: DATOSEXTERNOS, payload: response.data });
                return response;
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
        await Axios.get(`https://mercats.netlify.app/mercats.json`, {}, {
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (response.data) {
                dispatch({ type: DATOSEXTERNOS, payload: response.data });
                return response;
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