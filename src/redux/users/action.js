import { Api } from "../../utils/api";
export const setUserLoading = () => {
    return {
        type: 'SET_USER_LOADING',
    };
};

export const setUserData = (user) => {
    return { type: 'SET_USER', payload: user };
};

export const setUserErrors = (errors) => {
    return { type: 'SET_USER_ERRORS', payload: errors };
};

export const login = (values) => async (dispatch) => {
    try {
        dispatch(setUserLoading);
        const res = await Api.getUser(values);
        dispatch(setUserData(res));
    } catch (error) {
        dispatch(setUserErrors(error));
    }
};

export const signup = (user) => async (dispatch) => {
    try {
        dispatch(setUserLoading());
        const res = await Api.postUser(user);
        dispatch(setUserData(res));
    } catch (error) {
        dispatch(setUserErrors(error));
    }
};
