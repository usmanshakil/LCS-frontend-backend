const INITIAL_STATE={
    data:0
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_NEWS':
            return { ...state, data: action.value };
        default:
            return state;
    }
};
export default reducer;