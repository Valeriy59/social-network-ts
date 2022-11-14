import React from 'react'
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/img.jpg";
import {UsersPageType} from "../../redux/users-reducer";


type UsersPropsType = {
    usersPage: UsersPageType,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    onPageChanged: (pageNumber: number) => void,
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
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {props.follow(u.id)}}>Unfollow</button>
                            : <button onClick={() => {props.unfollow(u.id)}}>Follow</button>}
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