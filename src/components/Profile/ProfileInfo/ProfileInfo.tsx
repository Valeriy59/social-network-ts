import React from 'react';
import s from './ProfileInfo.module.css'
import {ProfileUserType} from "../../../redux/profile-reducer";
import userPhoto from "../../../assets/images/img.jpg";
import ProfileStatus from "./ProfileStatus"

type ProfileInfoType ={
    profile: ProfileUserType,
    status: string

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
                <ProfileStatus status={props.status}/>
            </div>
        </div>
    )
}


export default ProfileInfo