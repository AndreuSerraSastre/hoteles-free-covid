import { combineReducers } from 'redux';
import { authorization, hoteles } from "./Reducers";

export default combineReducers({
    authorization,
    hoteles
});