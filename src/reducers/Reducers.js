import { handleActions } from 'redux-actions';
import { AUTHORIZATION } from '../constants';
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