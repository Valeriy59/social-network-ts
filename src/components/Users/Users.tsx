import React from 'react'
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/img.jpg";
import {followTC, unfollowTC, UsersPageType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";



type UsersPropsType = {
    usersPage: UsersPageType,
    followTC: (userId: number) => void,
    unfollowTC: (userId: number) => void,
    onPageChanged: (pageNumber: number) => void,
}

// Презентационная компонента - чистая функция, которая возвращает jsx
const Users = (props: UsersPropsType) => {
    let state = props.usersPage
    return (
        <div>
            <Paginator usersPage={props.usersPage} onPageChanged={props.onPageChanged}/>
            {
                state.users.map(u => <User key={u.id}
                                           user={u}
                                           followingInProgress={state.followingInProgress}
                                           followTC={followTC}
                                           unfollowTC={unfollowTC}
                    />
                )
            }
        </div>
    )
}

export default Users