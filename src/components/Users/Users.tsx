import React from 'react'
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";
import userPhoto from "../../assets/images/img.jpg"
import styles from "./Users.module.css"

const Users = (props: UsersPropsType) => {

    let state = props.usersPage
    if (state.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {props.setUsers(response.data.items)})
        // props.setUsers([
        //     { id: 1, followed: false, fullName: 'Dmitry', status: 'I am a boss', location: {city: 'Minsk', country: 'Belarus'} },
        //     { id: 2, followed: true, fullName: 'Sasha', status: 'I am a boss too', location: {city: 'Moscow', country: 'Russia'} },
        //     { id: 2, followed: false, fullName: 'Andrey', status: 'I am a boss too', location: {city: 'Kiev', country: 'Ukraine'} }
        // ])
    }
    return (
        <div>
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