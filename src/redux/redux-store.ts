import {applyMiddleware, combineReducers, createStore} from "redux";
import {ProfileActionsTypes, profileReducer} from "./profile-reducer";
import {DialogsActionsTypes, dialogsReducer} from "./dialogs-reducer";
import {sideBarReducer} from "./sidebar-reducer";
import {UsersActionsTypes, usersReducer} from "./users-reducer";
import {authReducer, AuthActionsTypes} from "./auth-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import {AppActionsTypes, appReducer} from "./app-reducer";
import {useDispatch} from "react-redux";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBarPage: sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})
// типизация стейта всего приложения
export type AppReduxStoreType = ReturnType<typeof rootReducer>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type StateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppReduxStoreType, unknown, AppRootActionsType>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppReduxStoreType, unknown, AppRootActionsType>
type AppRootActionsType = AuthActionsTypes | DialogsActionsTypes | ProfileActionsTypes | UsersActionsTypes | AppActionsTypes
export default store