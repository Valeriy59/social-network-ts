import React from 'react';
import s from './ProfileInfo.module.css'
import {ProfilePropsType} from "../ProfileContainer";
import {ProfileUserType} from "../../../redux/profile-reducer";

type ProfileInfoType ={
    profile: ProfileUserType
}

const ProfileInfo = (props: ProfileInfoType) => {
    return (
        <div>
            <div>
                {/*<img src="http://skalsa.ru/images/bt_property/91/3.jpg"></img>*/}
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <span>{props.profile.aboutMe}</span>
                ava + desc
            </div>
        </div>
    )
}


export default ProfileInfo