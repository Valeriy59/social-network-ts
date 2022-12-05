import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfilePropsType} from "./ProfileContainer";
//  Компонента для профиля, затем импортируется в  App
// функциональная компонента, должна принимать в себя данные извне. чистая функция

const Profile = (props: ProfilePropsType) => {

    return (
        <div className={s.content}>
            <ProfileInfo status={props.status} profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile