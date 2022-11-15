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

type ActionsTypes = FollowActionType | UnfollowActionType | SetUsersActionType | SetCurrentPageActionType | SetTotalUsersCountActionType | SetIsFetchingActionType

type LocationType ={
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
    isFetching: boolean
}

let initialState: UsersPageType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 1,
    currentPage: 1,
    isFetching: true
}

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET USERS"
const SET_CURRENT_PAGE = "SET CURRENT PAGE"
const SET_TOTAL_USERS_COUNT = "SET TOTAL USERS COUNT"
const SET_ISFETCHING = "SET ISFETCHING"


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
        default:
            return state
    }
}
export const followAC = (userId: number): FollowActionType => (
    {
        type: FOLLOW,
        id: userId
    }
)
export const unfollowAC = (userId: number): UnfollowActionType => (
    {
        type: UNFOLLOW,
        id: userId
    }
)
export const setUsersAC = (users: UserType[]): SetUsersActionType => (
    {
        type: SET_USERS,
        users: users
    }
)
export const setCurrentPageAC = (currentPage: number): SetCurrentPageActionType => (
    {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    }
)
export const setTotalUsersCountAC = (totalUsersCount: number): SetTotalUsersCountActionType => (
    {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount: totalUsersCount
    }
)
export const setIsFetchingAC = (isFetching: boolean): SetIsFetchingActionType => (
    {
        type: SET_ISFETCHING,
        isFetching: isFetching
    }
)