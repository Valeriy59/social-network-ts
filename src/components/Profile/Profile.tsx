import React from 'react';
import s from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {} from "../../index";
import {PostObjType} from "../../redux/state";
//  Компонента для профиля, затем импортируется в  App

type ProfilePropsType = {
    profilePage: ProfileType
    addPost: () => void
    updateNewPostText: (newPostText: string) => void
    newPostText: string
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
                updateNewPostText={props.updateNewPostText}
                addPost={props.addPost}/>
        </div>
    )
}

export default Profile