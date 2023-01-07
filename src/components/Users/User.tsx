import React from 'react'
import styles from "./User.module.css";
import userPhoto from "../../assets/images/img.png";
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";


type UserPropsType = {
    user: UserType
    followingInProgress: number[]
    followTC: (userId: number) => void,
    unfollowTC: (userId: number) => void,
}

const User: React.FC<UserPropsType> = ({user, followTC, followingInProgress, unfollowTC}) => {
    return (<>
        <span><hr/></span>
             <div className={styles.userBlock}>
                {/*<span>*/}

                    <div className={styles.avatarButton}>
                        <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto}/>
                        </NavLink>
                            </div>
                        <div>
                            {user.followed
                                ? <button
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {unfollowTC(user.id)
                                    }}>
                                    Unfollow</button>
                                : <button
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {followTC(user.id)
                                    }}>
                                    Follow</button>}
                        </div>
                    </div>
                    <div className={styles.userInfo}>
                        <span>
                           <div>{user.name}</div>
                           <div>{user.status}</div>
                        </span>
                    </div>

                {/*</span>*/}

                </div></>
    )
}

export default User