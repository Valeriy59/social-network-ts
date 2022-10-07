import React from 'react';
import s from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {} from "../../index";
import {PostObjType} from "../../redux/state";
//  Компонента для профиля, затем импортируется в  App

type ProfilePropsType = {
    state: ProfileType
    addPost: (postMessage: string) => void
}

type ProfileType = {
    posts:Array<PostObjType>
}


// функциональная компонента, должна принимать в себя данные извне. чистая функция
const Profile = (props: ProfilePropsType) => {

    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPosts posts={props.state.posts} addPost={props.addPost}/>
        </div>
    )
}

export default Profile