import { combineReducers } from 'redux';
import { authorization, hoteles, opcion, filtro, usuarios, comentarios, puntuaciones, filterList, datosExternos } from "./Reducers";

export default combineReducers({
    authorization,
    hoteles,
    opcion,
    filtro,
    usuarios,
    comentarios,
    puntuaciones,
    filterList,
    datosExternos
});