export type SetAuthUserDataActionType = {
    type: "SET USER DATA"
    data: {
        userId: number | null
        email: string
        login: string
    }
}

type ActionsTypes = SetAuthUserDataActionType

export type AuthPageType = {
    userId: number | null
    email: string
    login: string
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
            return {...state, ...action.data}
        default:
            return state
    }
}

export const setAuthUserData = (userId: number, email: string, login: string): SetAuthUserDataActionType => (
    {
        type: SET_USER_DATA,
        data: {
            userId,
            email,
            login
        }
    }
)

