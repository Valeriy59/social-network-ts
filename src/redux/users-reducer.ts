import {usersAPI} from "../api/api";
import {Dispatch} from "redux";

export type FollowActionType = {
    type: "FOLLOW",
    id: number
}
export type UnfollowActionType = {
    type: "UNFOLLOW",
    id: number
}
export type SetUsersActionType = {
    type: "SET USERS"
    users: UserType[]
}
export type SetCurrentPageActionType = {
    type: "SET CURRENT PAGE"
    currentPage: number
}
export type SetTotalUsersCountActionType = {
    type: "SET TOTAL USERS COUNT"
    totalUsersCount: number
}
export type SetIsFetchingActionType = {
    type: "SET ISFETCHING"
    isFetching: boolean
}
export type SetFollowingProgressActionType = {
    type: "SET FOLLOWING PROGRESS"
    followingInProgress: boolean,
    userId: number
}

type ActionsTypes = FollowActionType
    | UnfollowActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetTotalUsersCountActionType
    | SetIsFetchingActionType
    | SetFollowingProgressActionType

type LocationType = {
    city: string,
    country: string
}
export type UserType = {
    id: number,
    followed: boolean,
    name: string,
    status: string,
    location: LocationType,
    photos: {
        small: string,
        large: string
    }
}

export type UsersPageType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[]
}

let initialState: UsersPageType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 1,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET USERS"
const SET_CURRENT_PAGE = "SET CURRENT PAGE"
const SET_TOTAL_USERS_COUNT = "SET TOTAL USERS COUNT"
const SET_ISFETCHING = "SET ISFETCHING"
const SET_FOLLOWING_PROGRESS = "SET FOLLOWING PROGRESS"


export const usersReducer = (state: UsersPageType = initialState, action: ActionsTypes): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, followed: true} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, followed: false} : u)}
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        case SET_ISFETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_FOLLOWING_PROGRESS:
            return {...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)}
        default:
            return state
    }
}
export const follow = (userId: number): FollowActionType => (
    {
        type: FOLLOW,
        id: userId
    }
)
export const unfollow = (userId: number): UnfollowActionType => (
    {
        type: UNFOLLOW,
        id: userId
    }
)
export const setUsers = (users: UserType[]): SetUsersActionType => (
    {
        type: SET_USERS,
        users: users
    }
)
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => (
    {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    }
)
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => (
    {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount: totalUsersCount
    }
)
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => (
    {
        type: SET_ISFETCHING,
        isFetching: isFetching
    }
)
export const setFollowingProgress = (userId: number, followingInProgress: boolean): SetFollowingProgressActionType => (
    {
        type: SET_FOLLOWING_PROGRESS,
        followingInProgress: followingInProgress,
        userId: userId
    }
)
export const requestUsersTC = (page: number, pageSize: number) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(setIsFetching(true))
        dispatch(setCurrentPage(page))
        usersAPI.getUsers(page, pageSize)
            .then(data => {
                dispatch(setIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
            })
    }
}  
export const followTC = (userId: number) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(setFollowingProgress(userId,true))
        usersAPI.follow(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(follow(userId))
                }
                dispatch(setFollowingProgress(userId,false))
            })
    }
}
export const unfollowTC = (userId: number) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(setFollowingProgress(userId,true))
        usersAPI.unfollow(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(unfollow(userId))
                }
                dispatch(setFollowingProgress(userId,false))
            })
    }
}