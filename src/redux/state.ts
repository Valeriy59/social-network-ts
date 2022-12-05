import {AddPostActionType, profileReducer, ProfileUserType, UpdateNewPostTextActionType} from "./profile-reducer";
import {dialogsReducer, SendMessageActionType, UpdateNewMessageBodyActionType} from "./dialogs-reducer";
import {sideBarReducer} from "./sidebar-reducer";

let rerenderEntireTree = () => {
    console.log('State was changed')
}

export type PostObjType = {
    id: number
    post: string | null
    likesCount: number
}

export type DialogsObjType = {
    id: number
    name: string
}

export type MessagesObjType = {
    id: number
    message: string
}

export type ProfilePageType = {
    posts: Array<PostObjType>
    newPostText: string,
    profile: ProfileUserType,
    status: string
}

export type DialogsPageType = {
    messages: Array<MessagesObjType>
    dialogs: Array<DialogsObjType>
    newMessageBody: string
}

export type SideBarType = {}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SideBarType
}

export type ActionsTypes = AddPostActionType | UpdateNewPostTextActionType | UpdateNewMessageBodyActionType | SendMessageActionType

//Все функции и данные упаковываем в один объект (ООП)

export type StoreType = {
    _state: RootStateType
    _callSubscriber: (state: RootStateType) => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionsTypes) => void
}


// export let store: StoreType = {
//     _state: {
//         profilePage: {
//             posts: [
//                 {id: 1, post: 'Hi, how are you?', likesCount: 12},
//                 {id: 2, post: "It's my first post", likesCount: 11},
//                 {id: 3, post: 'How are you?', likesCount: 10},
//                 {id: 4, post: 'yo', likesCount: 14},
//                 {id: 5, post: 'yo', likesCount: 19},
//                 {id: 6, post: 'yo', likesCount: 10},
//                 {id: 7, post: '324f', likesCount: 24}
//             ],
//             newPostText: 'it-kamasutra'
//         },
//         dialogsPage: {
//             dialogs: [
//                 {id: 1, name: 'Dimych'},
//                 {id: 2, name: 'Andrey'},
//                 {id: 3, name: 'Sveta'},
//                 {id: 4, name: 'Sasha'},
//                 {id: 5, name: 'Viktor'},
//                 {id: 6, name: 'Valera'}
//             ],
//             messages: [
//                 {id: 1, message: 'Hi'},
//                 {id: 2, message: 'How is your data?'},
//                 {id: 3, message: 'How are you?'},
//                 {id: 4, message: 'yo'},
//                 {id: 5, message: 'yo'},
//                 {id: 6, message: 'yo'}
//             ],
//             newMessageBody: ''
//         },
//         sidebar: {}
//     },
//     _callSubscriber() {
//         console.log('State was changed')
//     },
//     subscribe(observer) {
//         this._callSubscriber = observer
//     },
//     getState() {
//         return this._state
//     },
//     dispatch(action) {
//         this._state.profilePage = profileReducer(this._state.profilePage, <AddPostActionType | UpdateNewPostTextActionType>action)
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, <UpdateNewMessageBodyActionType | SendMessageActionType>action)
//         this._state.sidebar = sideBarReducer(this._state.sidebar, <AddPostActionType>action)
//         this._callSubscriber(this._state)
//     }
// }
