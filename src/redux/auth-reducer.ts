import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";


export type SetAuthUserDataActionType = {
    type: "SET USER DATA"
    payload: {
        userId: number | null
        email: string | null
        login: string | null
        isAuth: boolean
    }
}

type ActionsTypes = SetAuthUserDataActionType | any

export type AuthPageType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

let initialState: AuthPageType = {
    userId: null,
    email: '',
    login: '',
    isAuth: false
}

const SET_USER_DATA = "SET USER DATA"

export const authReducer = (state: AuthPageType = initialState, action: ActionsTypes): AuthPageType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => (
    {
        type: SET_USER_DATA,
        payload: {
            userId,
            email,
            login,
            isAuth
        }
    }
)

export const getAuthUserData = () => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let response = await authAPI.getAuth()

        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    }
}

// Thunk for login
export const login = (email :string, password: string, rememberMe: boolean) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let response = await authAPI.login(email, password, rememberMe,)

        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
            dispatch(stopSubmit("login", {_error: message}))
        }
    }
}

export const logout = () => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let response = await authAPI.logout()

        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}


