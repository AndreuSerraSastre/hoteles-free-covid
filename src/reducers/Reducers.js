import { handleActions } from 'redux-actions';
import { AUTHORIZATION, HOTELES, OPCION, FILTRO, USUARIOS, COMENTARIOS, PUNTUACIONES, FILTERLIST, DATOSEXTERNOS } from '../constants';
import history from '../history';

export const authorization = handleActions({
    [AUTHORIZATION]: (state, action) => {
        const { auth, usuario } = action.payload;
        if (!auth) {
            history.replace('/');
        }
        return { auth, usuario }
    }
}, { auth: false, usuario: null });

export const hoteles = handleActions({
    [HOTELES]: (state, action) => {
        const { hoteles } = action.payload;
        return hoteles
    }
}, []);

export const usuarios = handleActions({
    [USUARIOS]: (state, action) => {
        const { usuarios } = action.payload;
        return usuarios
    }
}, []);

export const comentarios = handleActions({
    [COMENTARIOS]: (state, action) => {
        const { comentarios } = action.payload;
        return comentarios
    }
}, []);

export const puntuaciones = handleActions({
    [PUNTUACIONES]: (state, action) => {
        const { puntuaciones } = action.payload;
        return puntuaciones
    }
}, []);

export const opcion = handleActions({
    [OPCION]: (state, action) => {
        const { opcion } = action.payload;
        return opcion
    }
}, "asc-stars");

export const filterList = handleActions({
    [FILTERLIST]: (state, action) => {
        const { filterList } = action.payload;
        return filterList
    }
}, [[], [], [], [], []]);

export const filtro = handleActions({
    [FILTRO]: (state, action) => {
        const { filtro } = action.payload;
        return filtro
    }
}, "");

export const datosExternos = handleActions({
    [DATOSEXTERNOS]: (state, action) => {
        const payload = action.payload;
        state.push(payload)
        return state
    }
}, []);