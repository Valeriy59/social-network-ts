import actions from "redux-form/lib/actions";

const UPDATE_NEW_POST_TEX = "UPDATE NEW POST TEXT"
const ADD_POST = "ADD POST"

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
    newPostText: string
}

export type DialogsPageType = {
    messages: Array<MessagesObjType>
    dialogs: Array<DialogsObjType>
}

export type SideBarType = {}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SideBarType
}

//Все функции и данные упаковываем в один объект (ООП)

export type StoreType = {
    _state: RootStateType
    _callSubscriber: (state: RootStateType) => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionsTypes) => void
}

type AddPostActionType = {
    type: "ADD POST"
    postText: string
}
type UpdateNewPostTextActionType = {
    type: "UPDATE NEW POST TEXT"
    newText: string
}

export type ActionsTypes = AddPostActionType | UpdateNewPostTextActionType

export const addPostActionCreator = (postText: string): AddPostActionType => (
    {
        type: ADD_POST,
        postText: postText
    }

)


export const updateNewPostTextActionCreator = (newText: string): UpdateNewPostTextActionType => (
    {
        type: UPDATE_NEW_POST_TEX,
        newText: newText
    }
)


export let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, post: 'Hi, how are you?', likesCount: 12},
                {id: 2, post: "It's my first post", likesCount: 11},
                {id: 3, post: 'How are you?', likesCount: 10},
                {id: 4, post: 'yo', likesCount: 14},
                {id: 5, post: 'yo', likesCount: 19},
                {id: 6, post: 'yo', likesCount: 10},
                {id: 7, post: '324f', likesCount: 24}
            ],
            newPostText: 'it-kamasutra'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Viktor'},
                {id: 6, name: 'Valera'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your data?'},
                {id: 3, message: 'How are you?'},
                {id: 4, message: 'yo'},
                {id: 5, message: 'yo'},
                {id: 6, message: 'yo'}
            ]
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('State was changed')
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    getState() {
        return this._state
    },
    dispatch(action) {
        if (action.type === "ADD POST") {
            let newPost: PostObjType = {
                id: new Date().getTime(),
                post: action.postText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber(this._state)
        } else if (action.type === "UPDATE NEW POST TEXT") {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber(this._state)
        }
    }
}


// export const addPost = () => {
//     let newPost: PostObjType = {
//         id: 5,
//         post: state.profilePage.newPostText,
//         likesCount: 0
//     }
//     state.profilePage.posts.push(newPost)
//     state.profilePage.newPostText = ''
//     rerenderEntireTree()
// }
//
// export const updateNewPostText = (newText: string)  => {
//     state.profilePage.newPostText = newText
//     rerenderEntireTree()
// }

// export const subscribe = (observer:() => void) => {
//     rerenderEntireTree = observer
// }

export default store