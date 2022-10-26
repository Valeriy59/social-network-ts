import {PostObjType, ProfilePageType} from "./state";

export type AddPostActionType = {
    type: "ADD POST"
    postText: string
}
export type UpdateNewPostTextActionType = {
    type: "UPDATE NEW POST TEXT"
    newText: string
}
type ActionsTypes = AddPostActionType | UpdateNewPostTextActionType

let initialState: ProfilePageType = {
        posts: [
            { id: 1, post: 'Hi, how are you?', likesCount: 12 },
            { id: 2, post: "It's my first post", likesCount: 11 },
            { id: 3, post: 'How are you?', likesCount: 10 },
            { id: 4, post: 'yo', likesCount: 14 },
            { id: 5, post: 'yo', likesCount: 19 },
            { id: 6, post: 'yo', likesCount: 10 },
            { id: 7, post: '324f', likesCount: 24 }
        ],
        newPostText: 'it-kamasutra'
}
const UPDATE_NEW_POST_TEXT = "UPDATE NEW POST TEXT"
const ADD_POST = "ADD POST"

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST:
            let newPost: PostObjType =
                {
                    id: new Date().getTime(),
                    post: action.postText,
                    likesCount: 0
                }
            state.posts.push(newPost)
            state.newPostText = ''
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}
export const addPostActionCreator = (postText: string): AddPostActionType => (
    {
        type: ADD_POST,
        postText: postText
    }
)
export const updateNewPostTextActionCreator = (newText: string): UpdateNewPostTextActionType => (
    {
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
    }
)