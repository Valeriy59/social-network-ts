import React from 'react';
import s from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
//  Компонента для профиля, затем импортируется в  App


const Profile = () => {
    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPosts />
        </div>
    )
}

export default Profile