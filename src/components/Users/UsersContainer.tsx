import React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unfollowAC, UsersPageType, UserType} from "../../redux/users-reducer";

type MapStatePropsType = {
    usersPage: UsersPageType
}
type MapDispatchPropsType = {
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    setUsers: (users: UserType[]) => void
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType
let mapStateToProps = (state: UsersPageType): MapStatePropsType => {
    return {
        usersPage: state
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersAC(users))
        }
    }
}
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
export default UsersContainer