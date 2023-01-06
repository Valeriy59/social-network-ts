import {Dispatch} from "redux";
import {getAuthUserData} from "./auth-reducer";
import {AppThunk} from "./redux-store";


let initialState = {
    initialized: false
}
export type AppInitStateType = typeof initialState

const SET_INITIALIZED = 'SET-INITIALIZED'

export type SetInitializedType = ReturnType<typeof setInitialized>

export type AppActionsTypes = SetInitializedType | any

export const appReducer = (state: AppInitStateType = initialState, action: AppActionsTypes): AppInitStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {...state, initialized: true}
        default:
            return state
    }
}

export const setInitialized = () => {
    return {type: 'SET-INITIALIZED'} as const
}

export const initializeApp = (): AppThunk => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData())
        Promise.all([promise])
            .then(() => {dispatch(setInitialized())})

    }
}
