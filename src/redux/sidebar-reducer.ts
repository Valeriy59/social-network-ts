import {SideBarType} from "./state";
import {AddPostActionType} from "./profile-reducer";

let initialState: SideBarType = {

}

type ActionsTypes = AddPostActionType

export const sideBarReducer = (state: SideBarType = initialState, action: ActionsTypes) => {
    return state
}