import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sideBarReducer} from "./sidebar-reducer";

let reducers = combineReducers({
    profilePge: profileReducer,
    dialogsPage: dialogsReducer,
    sideBarPage: sideBarReducer
})

let store = createStore(reducers)

export default store