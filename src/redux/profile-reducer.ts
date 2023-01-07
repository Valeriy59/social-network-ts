import {PostObjType, ProfilePageType} from "./state";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";
import {ProfileFormikType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {AppReduxStoreType, AppThunk} from "./redux-store";

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
    profile: ProfileType
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
export type SetProfileErrorActionType = {
    type: "SET_PROFILE_ERROR",
    profileErrorMessage: string
}

export type PostsPropsType = {
    id: number
    message: string
    likesCount: number

}
export type PhotosType = {
    small: string | null
    large: string | null
};
export type ContactsType = {
    [key: string]: string | undefined
    facebook?: string
    // website?: string
    // vk?: string
    // twitter?: string
    instagram?: string
    // youtube?: string
    github?: string
    // mainLink?: string
}
export type ProfileType = {
    aboutMe?: string
    contacts?: ContactsType
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    userId?: number
    photos?: PhotosType
}

export type ProfileActionsTypes = AddPostActionType
    | SetUserProfileActionType
    | SetStatusActionType
    | AddLikeActionType
    | DeletePostActionType
    | SetPhotoSuccessActionType
    | SetProfileErrorActionType

let initialState: ProfilePageType = {
    posts: [
        {id: 1, post: 'Hi, how are you?', likesCount: 12},
        {id: 2, post: "It's my first post", likesCount: 11},
        {id: 3, post: 'How are you?', likesCount: 10},
        {id: 4, post: 'yo', likesCount: 14}
    ],
    newPostText: 'it-kamasutra',
    profile: {
        aboutMe: '',
        contacts: {
            facebook: '',
            // website: '',
            // vk: '',
            // twitter: '',
            instagram: '',
            // youtube: '',
            github: '',
            // mainLink: '',
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
    isOwner: true,
    profileErrorMessage: ""

}
// const UPDATE_NEW_POST_TEXT = "UPDATE NEW POST TEXT"
const ADD_POST = "ADD POST"
const SET_USER_PROFILE = "SET USER PROFILE"
const SET_STATUS = 'SET STATUS'
const SET_PROFILE_ERROR = "SET_PROFILE_ERROR"
const DELETE_POST = 'DELETE POST'
const SAVE_PHOTO_SUCCESS = 'SAVE PHOTO SUCCESS'

export const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionsTypes) => {
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
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS:
            return {...state, status: action.status}
        case DELETE_POST: {
            return {...state, posts: [...state.posts.filter(p => p.id !== action.id)]}
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: { ...state.profile, photos: action.photos }}
        }
        case SET_PROFILE_ERROR:
            return {...state, profileErrorMessage: action.profileErrorMessage}
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

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => (
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
export const setProfileError = (profileErrorMessage: string): SetProfileErrorActionType => (
    {
    type: SET_PROFILE_ERROR,
    profileErrorMessage
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

export const getUserProfile = (userId: number): AppThunk => {
    return async (dispatch) => {
        let response = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(response))
    }
}
export const getStatus = (userId: string): AppThunk => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response))
    }
}
export const updateStatus = (status: string): AppThunk => {
    return async (dispatch) => {
        try {
            let response = await profileAPI.updateStatus(status)
            if (response.resultCode === 0) {
                dispatch(setStatus(status))
            }
        }
        catch (err) {
            dispatch(setProfileError('Some error occurred'))
        }
    }
}
export const savePhoto = (photoFile: File): AppThunk => {
    return async (dispatch) => {
        try {
            const response = await profileAPI.savePhoto(photoFile);

            if (response.resultCode === 0) {
                dispatch(setPhotoSuccess(response.data.photos));
            }
        } catch (error) {
            console.log(`Error save avatar. ${error}`);
        }
    }
}
export const saveProfile = (profile: ProfileFormikType): AppThunk => async (dispatch, getState: () => AppReduxStoreType) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        dispatch(getUserProfile(userId!))
        dispatch(setProfileError(""))
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : "Some error"
        dispatch(setProfileError(message))
    }
}