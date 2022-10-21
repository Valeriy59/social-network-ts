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

const UPDATE_NEW_POST_TEXT = "UPDATE NEW POST TEXT"
const ADD_POST = "ADD POST"

export const profileReducer = (state: ProfilePageType, action: ActionsTypes) => {
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