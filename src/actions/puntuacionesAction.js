import { PUNTUACIONES } from '../constants';
import puntuaciones from './../json/puntuaciones.json'

export const puntuacionesGet = () => {
    return async dispatch => {
        if (puntuaciones) {
            dispatch({ type: PUNTUACIONES, payload: { puntuaciones } });
            return puntuaciones;
        }
    }
}

export const addPuntua = (puntuaciones, puntuacion, id) => {
    return async dispatch => {
        if (puntuaciones) {
            const puntuacionesDB = puntuaciones.find(puntuacion => puntuacion.identificador === id)?.puntuaciones;
            if (puntuacionesDB) {
                puntuacionesDB.push(puntuacion);
            }
            dispatch({ type: PUNTUACIONES, payload: { puntuaciones } });
            return puntuaciones;
        }
    }
}