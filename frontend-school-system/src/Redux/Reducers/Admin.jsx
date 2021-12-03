import {
    DISPLAY_ADMIN_PROFILE,
} from '../Actions/ActionTypes'

const INITIAL_STATE = {
    showAdminProfile: false,
}

const adminReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case DISPLAY_ADMIN_PROFILE:
            return { ...state, showAdminProfile: action.data };

        default:
            return state;
    }
};
export default adminReducer;