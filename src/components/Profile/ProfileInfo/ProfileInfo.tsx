import React from 'react';
import s from './ProfileInfo.module.css'
import {ProfileUserType} from "../../../redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type ProfileInfoType ={
    profile: ProfileUserType,
    status: string,
    updateStatus: (status: string) => void

}

const ProfileInfo = (props: ProfileInfoType) => {
    return (
        <div>
            <div>
                {/*<img src="http://skalsa.ru/images/bt_property/91/3.jpg"></img>*/}
            </div>
            <div className={s.descriptionBlock}>
                {/*<img src={props.profile.photos.large !== null ? props.profile.photos.large : userPhoto}/>*/}
                {/*<span>{props.profile.aboutMe}</span>*/}
                <ProfileStatusWithHooks
                    status={props.status}
                    updateUserStatus={props.updateStatus}
                />
            </div>
        </div>
    )
}


export default ProfileInfo