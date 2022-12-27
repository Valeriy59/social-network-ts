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
            <ProfileInfo
                isOwner={props.isOwner}
                status={props.status}
                profile={props.profile}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
            />
            <MyPostsContainer isOwner={props.isOwner} userAvatar={props.profile?.photos.small}/>
        </div>
    )
}

export default Profile