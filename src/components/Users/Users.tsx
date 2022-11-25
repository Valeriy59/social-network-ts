import React from 'react'
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/img.jpg";
import {UsersPageType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {usersAPI} from "../../api/api";


type UsersPropsType = {
    usersPage: UsersPageType,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    onPageChanged: (pageNumber: number) => void,
    setFollowingProgress: (userID: number, followingProgress: number[]) => void
}

// Презентационная компонента - чистая функция, которая возвращает jsx
const Users = (props: UsersPropsType) => {
    let state = props.usersPage
    let pagesCount = Math.ceil(state.totalUsersCount / state.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map((p,index) => {
                    return <span key={index} className={state.currentPage === p ? styles.selectedPage : ''}
                                 onClick = {() => {props.onPageChanged(p)}}>{p}</span>
                })}
            </div>
            {
                state.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.usersPage.followingInProgress.some(id => id === u.id)} onClick={() => {
                                // axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{
                                //     withCredentials: true,
                                //     headers: {
                                //         "API-KEY": "65f7699b-6500-4214-ae2c-c06621a5a9d2"
                                //     }
                                // })
                                props.setFollowingProgress(u.id,true)
                                usersAPI.unfollow(u.id)
                                    .then(data => {
                                        if (data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                        props.setFollowingProgress(u.id,false)
                                    })
                            }}>Unfollow</button>
                            : <button disabled={props.usersPage.followingInProgress.some(id => id === u.id)} onClick={() => {
                                // axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                //     withCredentials: true,
                                //     headers: {
                                //         "API-KEY": "65f7699b-6500-4214-ae2c-c06621a5a9d2"
                                //     }
                                // })
                                props.setFollowingProgress(u.id,true)
                                usersAPI.follow(u.id)
                                    .then(data => {
                                        if (data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                        props.setFollowingProgress(u.id,false)
                                    })
                            }}>Follow</button>}
                    </div>
                </span>
                    <span>
                        <span>
                           <div>{u.name}</div>
                           <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{'u.location.country'}</div>
                            <div>{'u.location.city'}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

export default Users