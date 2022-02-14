import * as AT from "./authTypes";

const initialState = {
    username: "",
    isLoggedIn: "",
    error: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AT.LOGIN_REQUEST:
        case AT.LOGOUT_REQUEST:
            return {
                ...state,
            };
        case AT.REGISTER_REQUEST:
            return {
                ...state,
            };
        case AT.SUCCESS:
        case AT.FAILURE:
            return {
                username: action.payload.username,
                isLoggedIn: action.payload.isLoggedIn,
            };
        case AT.SUCCESS_R:
            return {
                message: action.payload,
                error: "",
            };
        case AT.FAILURE_R:
            return {
                users: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;