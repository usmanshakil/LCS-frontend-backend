import { SHOW_COOKIE_POLICY } from '../Actions/ActionTypes';

const INITIAL_STATE = {
    showCookiePolicy: true
}

const popUpModalsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_COOKIE_POLICY:
            return { ...state, showCookiePolicy: action.data };
        default:
            return state;
    }
};
export default popUpModalsReducer;