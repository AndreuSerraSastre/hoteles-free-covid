import { COMENTARIOS } from '../constants';
import comentarios from './../json/comentarios.json'

export const comentariosGet = () => {
    return async dispatch => {
        if (comentarios) {
            dispatch({ type: COMENTARIOS, payload: { comentarios } });
            return comentarios;
        }
    }
}

export const addComent = (comentarios, comentario, id) => {
    return async dispatch => {
        if (comentarios) {
            const comentariosDB = comentarios.find(comentario => comentario.identificador === id)?.comentarios;
            if (comentariosDB) {
                comentariosDB.push(comentario);
            }
            dispatch({ type: COMENTARIOS, payload: { comentarios } });
            return comentarios;
        }
    }
}