import * as actionTypes from '../actions/actionsTypes';
import axios from 'axios';

export const signup = (data) => {
    return dispatch => {
        try {
            axios.post('/api/user/signup', {
                "email": data.email,
                "password": data.password,
                "name": data.name
            })
            .then(res => {
                // Save in localstorage
                localStorage.setItem('authData', JSON.stringify(res.data));
                dispatch(startSignup(res.data))
            })
            .catch(err => {
                dispatch(authArror("OTHER"))
            })
        } catch (error) {
            dispatch(authArror("INTERNET"))
        }
    }
};

export const startSignup = (data) => {
    return {
        type: actionTypes.SIGNUP,
        data: data
    }
};


export const login = (data) => {
    return dispatch => {
        try {
            axios.post('/api/user/login', {
                "email": data.email,
                "password": data.password
            })
            .then(res => {
                // Save in localstorage
                localStorage.setItem('authData', JSON.stringify(res.data));
                dispatch(startLogin(res.data))
            })
            .catch(err => {
                dispatch(authArror("OTHER"))
            })
        } catch (error) {
            dispatch(authArror("INTERNET"))
        }
    }
};

export const startLogin = (data) => {
    return {
        type: actionTypes.LOGIN,
        data: data
    }
};

export const authArror = (type) => {
    return {
        type: actionTypes.AUTH_ERROR,
        errorType: type
    }
};


export const logout = () => {
    localStorage.removeItem('authData')
    return {
        type: actionTypes.LOGIN
    }
};


export const autoSignIn = () => {
    let authData = localStorage.getItem("authData");
    authData = JSON.parse(authData);
    return dispatch => {
        if(authData) {
            console.log(authData)
            console.log("Auto sign")
            dispatch(startLogin(authData));
        }
    }
};