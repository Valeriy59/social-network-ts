import React from 'react';
import s from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {} from "../../index";
import {PostObjType} from "../../redux/state";
//  Компонента для профиля, затем импортируется в  App

type ProfilePropsType = {
    state: ProfileType
}

type ProfileType = {
    posts:Array<PostObjType>
}

const Profile = (props: ProfilePropsType) => {

    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPosts posts={props.state.posts}/>
        </div>
    )
}

export default Profile