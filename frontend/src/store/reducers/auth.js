import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    name: '',
    email: '',
    token: null,
    error: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN:
            return {
                ...state,
                name: action.data.user.name,
                email: action.data.user.email,
                token: action.data.token
            };
        case actionTypes.SIGNUP:
            return {
                ...state,
                name: action.data.user.name,
                email: action.data.user.email,
                token: action.data.token
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                username: '',
                email: '',
                token: null
            };
        case actionTypes.AUTH_ERROR:
            let error = action.errorType == "INTERNET" ? "Erreur de connection": null;
            return {
                ...state,
                error: error
            };
        default:
            return state;
    }
}

export default reducer;