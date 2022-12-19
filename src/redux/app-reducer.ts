import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {getAuthUserData} from "./auth-reducer";


let initialState = {
    initialized: false
}
export type AppInitStateType = typeof initialState

const SET_INITIALIZED = 'SET-INITIALIZED'

export type SetInitializedType = ReturnType<typeof setInitialized>

type ActionsTypes = SetInitializedType | any

export const appReducer = (state: AppInitStateType = initialState, action: ActionsTypes): AppInitStateType => {
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

export const initializeApp = () => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        let promise = dispatch(getAuthUserData())
        Promise.all([promise])
            .then(() => {dispatch(setInitialized())})

    }
}
