import React from 'react';
import s from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {} from "../../index";
import {ActionsTypes, PostObjType} from "../../redux/state";
//  Компонента для профиля, затем импортируется в  App

type ProfilePropsType = {
    profilePage: ProfileType
    newPostText: string
    dispatch: (action: ActionsTypes) => void
}

type ProfileType = {
    posts:Array<PostObjType>
    newPostText: string
}


// функциональная компонента, должна принимать в себя данные извне. чистая функция
const Profile = (props: ProfilePropsType) => {

    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPosts
                posts={props.profilePage.posts}
                newPostText={props.profilePage.newPostText}
                dispatch={props.dispatch}
            />
        </div>
    )
}

export default Profile