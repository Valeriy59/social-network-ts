import React from 'react';
import {followTC, unfollowTC, UsersPageType} from "../../redux/users-reducer";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import styles from "./Users.module.css";



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
        <div className={styles.usersPage}>
            <div className={styles.paginator}>
            <Paginator usersPage={props.usersPage} onPageChanged={props.onPageChanged} />
            </div>
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