import {authAPI, securityAPI} from "../api/api";
import {AppThunk} from "./redux-store";


export type AuthPageType = {
    userId: number | null
    email: string | null
    login: string | null
    authErrorMessage: string | null
    isAuth: boolean
    captchaUrl: string | null
}

let initialState: AuthPageType = {
    userId: null,
    email: '',
    login: '',
    isAuth: false,
    authErrorMessage: null,
    captchaUrl: null
}

export type SetAuthUserDataActionType = {
    type: "SET USER DATA"
    payload: {
        userId: number | null
        email: string | null
        login: string | null
        isAuth: boolean
    }
}

export type AuthActionsTypes = SetAuthUserDataActionType | ReturnType<typeof setAuthError> | ReturnType<typeof getCaptchaUrlSuccess>

export const authReducer = (state: AuthPageType = initialState, action: AuthActionsTypes): AuthPageType => {
    switch (action.type) {
        case "SET USER DATA":
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => (
    {
        type: "SET USER DATA",
        payload: {
            userId,
            email,
            login,
            isAuth
        }
    }
)
export const setAuthError = (authErrorMessage: string) => (
    {
        type: "SET_AUTH_ERROR",
        payload: {authErrorMessage}
}) as const

export const getCaptchaUrlSuccess = (captchaUrl: string) => (
    {
        type: "GET_CAPTCHA_URL_SUCCESS",
        payload: {captchaUrl}
}) as const

export const getAuthUserData = (): AppThunk => {
    return async (dispatch) => {
        let response = await authAPI.getAuth()
        console.log(response.resultCode)
        if (response.resultCode === 0) {
            let {id, email, login} = response.data
            dispatch(setAuthUserData(id, email, login, true))

        }
    }
}

// Thunk for login
export const login = (email :string, password: string, rememberMe: boolean, captcha: string | null): AppThunk => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe, captcha)

        if (response.data.resultCode === 0) {
            let promise = dispatch(getAuthUserData())
            await Promise.all([promise])
            dispatch(setAuthError(""))
            dispatch(getCaptchaUrlSuccess(""))
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 0
                ? response.data.messages[0] : "Some error"
            dispatch(setAuthError(message))
        }
    }
}
export const logout = (): AppThunk => {
    return async (dispatch) => {
        let response = await authAPI.logout()

        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}
    export const getCaptchaUrl = (): AppThunk => async (dispatch) => {
        const response = await securityAPI.getCaptchaUrl()
        const captchaUrl = response.data.url
        dispatch(getCaptchaUrlSuccess(captchaUrl))
    }
