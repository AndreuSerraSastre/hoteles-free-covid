import { handleActions } from 'redux-actions';
import { AUTHORIZATION, HOTELES } from '../constants';
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