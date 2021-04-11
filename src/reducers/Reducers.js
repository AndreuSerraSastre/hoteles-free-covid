import { handleActions } from 'redux-actions';
import { AUTHORIZATION, HOTELES, OPCION,FILTRO } from '../constants';
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

export const opcion = handleActions({
    [OPCION]: (state, action) => {
        const { opcion } = action.payload;
        return opcion
    }
}, "asc-stars");

export const filtro = handleActions({
    [FILTRO]: (state, action) => {
        const { filtro } = action.payload;
        return filtro
    }
}, "");