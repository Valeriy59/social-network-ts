import React from 'react';
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profile-reducer";
import {Dispatch} from "redux";
import {ProfileFormikType} from "./ProfileInfo/ProfileDataForm";
//  Компонента для профиля, затем импортируется в  App
// функциональная компонента, должна принимать в себя данные извне. чистая функция
export type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => (dispatch: Dispatch) => void
    isOwner: boolean
    savePhoto: (file:File) => (dispatch: Dispatch) => void
    saveProfile: (profile:ProfileFormikType) => (dispatch: Dispatch) => void
    errorMessage: string
}
const Profile = (props: ProfilePropsType) => {

    return (
        <div className={s.content}>
            <div >
                <img className={s.headerProfile} alt='header img'
                     src='https://images.squarespace-cdn.com/content/v1/5779b324f5e231f12b51fd52/1628735053409-PDJ5PTO8T3AJGQHSKN2U/Honeywell%2BExperion%2BOrion%2BConsole.jpg'/>
            </div>
            <ProfileInfo
                isOwner={props.isOwner}
                status={props.status}
                profile={props.profile}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
                errorMessage={props.errorMessage}
            />
            <MyPostsContainer />
        </div>
    )
}

export default Profile