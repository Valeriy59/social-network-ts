import React, {ChangeEvent, useRef, useState} from 'react';
import s from './ProfileInfo.module.css'
import userPhoto from "../../../assets/images/img.jpg";
import {ProfileType} from "../../../redux/profile-reducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {Dispatch} from "redux";
import {ProfilePropsType} from "../Profile";
import Preloader from "../../Common/Preloader/Preloader";
import {ProfileDataForm, ProfileFormikType} from "./ProfileDataForm";

// type ProfileInfoType ={
//     profile: ProfileUserType
//     status: string
//     updateStatus: (status: string) => (dispatch: Dispatch) => void
//     isOwner: boolean
//     savePhoto: (photoFile: File) => (dispatch: Dispatch) => void
//     // saveProfile: (profile:ProfileFormikType) => (dispatch: Dispatch) => void
//     errorMessage: string
// }

const ProfileInfo = (props: ProfilePropsType) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const [editMode, setEditMode] = useState(false)

    const selectFileHandler = () => {
        inputRef && inputRef.current?.click();
    }

    const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length === 1) {
            props.savePhoto(event.target.files[0])
        }
    }

    if (!props.profile) {
        return <Preloader/>
    }
    const onSubmit = (values: ProfileFormikType) => {
        props.saveProfile(values)
        setEditMode(false)
    }

    return (
        <div className={s.descriptionBlock}>
            <div className={s.profile}>
                <img src={props.profile.photos?.large !== null ? props.profile.photos?.large : userPhoto}
                     className={s.mainPhoto}/>
                {
                    props.isOwner &&
                    <div>
                        <button onClick={selectFileHandler}>upload file</button>
                        <input style={{display: "none"}}
                               ref={inputRef}
                               type={"file"}
                               onChange={onMainPhotoSelected}
                        />
                    </div>
                }

                <ProfileStatusWithHooks
                    status={props.status}
                    updateUserStatus={props.updateStatus}
                />
            </div>
            <div className={s.profileInfo}>
                {
                    editMode
                        ? <ProfileDataForm profile={props.profile} onSubmit={onSubmit}/>
                        : <ProfileData isOwner={props.isOwner} profile={props.profile}
                                       goToEditMode={() => {
                                           setEditMode(true)
                                       }}
                                       errorMessage={props.errorMessage}/>
                }
            </div>
        </div>
    )
}


type ContactPropsType = {
    [key: string]: string | undefined;
    contactTitle: string
    contactValue: string | undefined
}
export const Contact = ({contactTitle, contactValue}: ContactPropsType) => {
    return <div className={s.contacts}>
        <li><b>{contactTitle}</b>: {contactValue}</li>
    </div>
}

type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
    errorMessage: string
}
const ProfileData = ({profile, isOwner, goToEditMode, errorMessage}: ProfileDataType) => {
    return <div>
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {
            profile.lookingForAJob && <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
        }
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {profile.contacts && Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key}
                            contactValue={profile.contacts && profile.contacts[key]}/>
        })}
        </div>
        {
            isOwner && <div>
                <button onClick={goToEditMode}>edit</button>
                {errorMessage && <div className={s.error}>{errorMessage}</div>}
            </div>
        }
    </div>
}


export default ProfileInfo