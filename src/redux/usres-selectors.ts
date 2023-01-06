import {AppReduxStoreType} from "./redux-store";

export const getUsers = (state: AppReduxStoreType) => {
    return state.usersPage.users
}

export const getPageSize = (state: AppReduxStoreType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppReduxStoreType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppReduxStoreType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppReduxStoreType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppReduxStoreType) => {
    return state.usersPage.followingInProgress
}