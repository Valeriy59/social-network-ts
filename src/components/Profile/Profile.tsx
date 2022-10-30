import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { PostObjType, StoreType} from "../../redux/state";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {Store} from "redux";
//  Компонента для профиля, затем импортируется в  App

type ProfilePropsType = {
    store: Store
}
// функциональная компонента, должна принимать в себя данные извне. чистая функция
const Profile = (props: ProfilePropsType) => {

    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}
                               // posts={props.profilePage.posts}
                               // newPostText={props.profilePage.newPostText}
                               // dispatch={props.dispatch}
            />
        </div>
    )
}

export default Profile