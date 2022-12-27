import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css'
import userPhoto from "../../../assets/images/img.jpg";
import {ProfileUserType} from "../../../redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type ProfileInfoType ={
    profile: ProfileUserType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photoFile: File) => void
}

const ProfileInfo = (props: ProfileInfoType) => {
    const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length === 1) {
            props.savePhoto(event.target.files[0]);
        }
    };

    return (
        <div>
            <div>
                {/*<img src="http://skalsa.ru/images/bt_property/91/3.jpg"></img>*/}
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large !== null ? props.profile.photos.large : userPhoto} className={s.mainPhoto}/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                {/*<span>{props.profile.aboutMe}</span>*/}
                <div>
                    Looking for a job: {props.profile.lookingForAJob ? 'yes' : 'no'}
                </div>
                <div>
                    About me: {props.profile.aboutMe}
                </div>
                <ProfileStatusWithHooks
                    status={props.status}
                    updateUserStatus={props.updateStatus}
                />
            </div>
        </div>
    )
}


export default ProfileInfo