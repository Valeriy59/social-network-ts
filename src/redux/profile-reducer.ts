import {PostObjType, ProfilePageType} from "./state";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";

export type AddPostActionType = {
    type: "ADD POST"
    postText: string
}
// export type UpdateNewPostTextActionType = {
//     type: "UPDATE NEW POST TEXT"
//     newText: string
// }
export type SetUserProfileActionType = {
    type: "SET USER PROFILE"
    profile: ProfileUserType
}
export type SetStatusActionType = {
    type: "SET STATUS"
    status: string
}
export type AddLikeActionType = {
    type: "ADD LIKE"
    id: string
    count: number
}
export type DeletePostActionType = {
    type: "DELETE POST"
    id: number
}
export type SetPhotoSuccessActionType = {
    type: 'SAVE PHOTO SUCCESS'
    photos: PhotosType
}
export type PhotosType = {
    small: string | null
    large: string | null
};
export type ProfileUserType = {
    aboutMe: string
    contacts: {
        facebook: string
        website: string
        vk: string
        twitter: string
        instagram: string
        youtube: string
        github: string
        mainLink: string
    },
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: {
        small: string
        large: string
    }
}

type ActionsTypes = AddPostActionType
    | SetUserProfileActionType
    | SetStatusActionType
    | AddLikeActionType
    | DeletePostActionType
    | SetPhotoSuccessActionType

let initialState: ProfilePageType = {
    posts: [
        {id: 1, post: 'Hi, how are you?', likesCount: 12},
        {id: 2, post: "It's my first post", likesCount: 11},
        {id: 3, post: 'How are you?', likesCount: 10},
        {id: 4, post: 'yo', likesCount: 14},
        {id: 5, post: 'yo', likesCount: 19},
        {id: 6, post: 'yo', likesCount: 10},
        {id: 7, post: '324f', likesCount: 24}
    ],
    newPostText: 'it-kamasutra',
    profile: {
        aboutMe: '',
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: '',
        },
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        userId: 0,
        photos: {
            small: '',
            large: '',
        },
    },
    status: '',
    isOwner: true

}
// const UPDATE_NEW_POST_TEXT = "UPDATE NEW POST TEXT"
const ADD_POST = "ADD POST"
const SET_USER_PROFILE = "SET USER PROFILE"
const SET_STATUS = 'SET STATUS'
const ADD_LIKE = 'ADD LIKE'
const DELETE_POST = 'DELETE POST'
const SAVE_PHOTO_SUCCESS = 'SAVE PHOTO SUCCESS'

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostObjType =
                {
                    id: new Date().getTime(),
                    post: action.postText,
                    likesCount: 0
                }
            return {...state, posts: [...state.posts, newPost], newPostText: ''}
        }
        // case UPDATE_NEW_POST_TEXT: {
        //     return {...state, newPostText: action.newText}
        // }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS:
            return {...state, status: action.status}
        // case ADD_LIKE: {
        //     return {...state, postData: state.postData.map(el => el.id === action.id ? {...el, likes: action.count} : el)}
        // }
        case DELETE_POST: {
            return {...state, posts: [...state.posts.filter(p => p.id !== action.id)]}
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: { ...state.profile, photos: action.photos }}
        }
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
// export const updateNewPostTextActionCreator = (newText: string): UpdateNewPostTextActionType => (
//     {
//         type: UPDATE_NEW_POST_TEXT,
//         newText: newText
//     }
// )
export const setUserProfile = (profile: ProfileUserType): SetUserProfileActionType => (
    {
        type: SET_USER_PROFILE,
        profile: profile
    }
)
export const setStatus = (status: string): SetStatusActionType => (
    {
        type: SET_STATUS,
        status: status
    }
)
export const addLike = (count: number, id: string): AddLikeActionType => (
    {
        type: ADD_LIKE,
        count: count,
        id: id
    }
)
export const deletePostActionCreator = (id: number): DeletePostActionType => (
    {
        type: DELETE_POST,
        id: id
    }
)
export const setPhotoSuccess = (photos: PhotosType): SetPhotoSuccessActionType => (
    {
        type: SAVE_PHOTO_SUCCESS,
        photos: photos
    }
)

export const getUserProfile = (userId: string) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))
    }
}
export const getStatus = (userId: string) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
    }
}
export const updateStatus = (status: string) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
}
export const savePhoto = (photoFile: File) => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        try {
            const response = await profileAPI.savePhoto(photoFile);

            if (response.resultCode === 0) {
                dispatch(setPhotoSuccess(response.data.photos));
            }
        } catch (error) {
            console.log(`Error save avatar. ${error}`);
        }
    };
};