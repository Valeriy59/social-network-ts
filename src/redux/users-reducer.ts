

export type FollowActionType = {
    type: "FOLLOW",
    id: number
}
export type UnfollowActionType = {
    type: "UNFOLLOW",
    id: number
}
export type SetUsersAC = {
    type: "SET USERS"
    users: UserType[]
}

type ActionsTypes = FollowActionType | UnfollowActionType | SetUsersAC

type LocationType ={
    city: string,
    country: string
}
export type UserType = {
    id: number,
    followed: boolean,
    fullName: string,
    status: string,
    location: LocationType
}
export type UsersPageType = {
    users: UserType[]
}

let initialState: UsersPageType = {
    users: []
}
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET USERS"

export const usersReducer = (state: UsersPageType = initialState, action: ActionsTypes): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, followed: true} : u)}
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.id ? {...u, followed: false} : u)}
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
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
export const setUsersAC = (users: UserType[]): SetUsersAC => (
    {
        type: SET_USERS,
        users: users
    }
)