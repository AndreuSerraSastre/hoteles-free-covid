import { combineReducers } from 'redux';
import { authorization, hoteles, opcion, filtro, usuarios, comentarios, puntuaciones } from "./Reducers";

export default combineReducers({
    authorization,
    hoteles,
    opcion,
    filtro,
    usuarios,
    comentarios,
    puntuaciones
});