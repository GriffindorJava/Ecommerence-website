import * as AT from "./authTypes";
import axios from "axios";

const AUTH_URL = "http://localhost:8080/auth/signin";
const REGISTER_URL = "http://localhost:8080/auth/signup";

export const authenticateUser = (email, password) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post(AUTH_URL, {
            email: email,
            password: password,
        });
        console.log(response.data)
        console.log(response.data.accessToken)
        localStorage.setItem("jwtToken", response.data.accessToken);
        dispatch(success({ username: response.data.name, isLoggedIn: true }));
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch(failure());
        return Promise.reject(error);
    }
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(logoutRequest());
        localStorage.removeItem("jwtToken");
        dispatch(success({ username: "", isLoggedIn: false }));
    };
};

export const registerUser = (firstName, lastName, email, phoneNumber, password) => async (dispatch) => {
    dispatch(registerRequest());
    try {
        const response = await axios.post(REGISTER_URL, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
        });
        //localStorage.setItem("jwtToken", response.data.token);
        dispatch(successR(response.data));
        return Promise.resolve(response.data);
    } catch (error) {
        dispatch(failureR(error.message));
        return Promise.reject(error);
    }
};

const loginRequest = () => {
    return {
        type: AT.LOGIN_REQUEST,
    };
};

const logoutRequest = () => {
    return {
        type: AT.LOGOUT_REQUEST,
    };
};

const registerRequest = () => {
    return {
        type: AT.REGISTER_REQUEST,
    };
};

const success = (isLoggedIn) => {
    return {
        type: AT.SUCCESS,
        payload: isLoggedIn,
    };
};

const failure = () => {
    return {
        type: AT.FAILURE,
        payload: false,
    };
};

const successR = (user) => {
    return {
        type: AT.SUCCESS_R,
        payload: user,
    };
};

const failureR = (error) => {
    return {
        type: AT.FAILURE_R,
        payload: error,
    };
};