import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sideBarReducer} from "./sidebar-reducer";
import {usersReducer} from "./users-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBarPage: sideBarReducer,
    usersPage: usersReducer
})
// типизация стейта всего приложения
export type AppStateType = ReturnType<typeof rootReducer>

let store = createStore(rootReducer)
export type StateType = ReturnType<typeof store.getState>
export default store