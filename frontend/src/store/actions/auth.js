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
                console.log(err)
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
        type: actionTypes.LOGOUT
    }
};


export const autoSignIn = () => {
    let authData = localStorage.getItem("authData");
    authData = JSON.parse(authData);
    return dispatch => {
        const now = new Date();
        if (authData) {
            const parsedExpiryDate = new Date(parseInt(authData.expiresDate));
            if (parsedExpiryDate > now) {
                console.log("Auto sign")
                dispatch(startLogin(authData));
            } else {
                // Generate a new token and login the user
                const user = {
                    email: authData.user.email,
                    name: authData.user.name,
                    userId: authData.user.userId,
                }
                axios.post('/api/user/generatetoken', user)
                .then(res => {
                    console.log("Re signin");
                    // Update the localstorage localstorage
                    let previousData = JSON.parse(localStorage.getItem('authData'));
                    previousData.token = res.data.token;
                    previousData.expiresDate = res.data.expiresDate;
                    localStorage.setItem('authData', JSON.stringify(previousData));
                    const newData = {
                        ...user,
                        token: res.data.token,
                        expiresDate: res.data.expiresDate
                    }
                    dispatch(startLogin(newData))
                })
                .catch(err => {
                    dispatch(authArror("OTHER"))
                })
            }
        } else {
            dispatch(logout());
        }
    }
};