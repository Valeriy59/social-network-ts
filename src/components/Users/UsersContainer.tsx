import React from "react";
import UsersC from "./UsersC";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unfollowAC, UsersPageType, UserType} from "../../redux/users-reducer";
import {StateType} from "../../redux/redux-store";

type MapStatePropsType = {
    usersPage: UsersPageType
}
type MapDispatchPropsType = {
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    setUsers: (users: UserType[]) => void
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType
let mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        usersPage: state.usersPage
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
const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersC)
export default UsersContainer