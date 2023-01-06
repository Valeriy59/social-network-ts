import {useFormik} from "formik";
import s from "../ProfileInfo.module.css"
import React from "react";
import {ContactsType, ProfileType} from "../../../redux/profile-reducer";

type ProfileDataFormType = {
    profile: ProfileType
    onSubmit: (values: ProfileFormikType) => void
}
export type ProfileFormikType = {
    fullName?: string,
    lookingForAJob: boolean,
    lookingForAJobDescription?: string,
    aboutMe?: string
    contacts?: ContactsType

}
export const ProfileDataForm = ({ profile, onSubmit }: ProfileDataFormType) => {
    const formik = useFormik({
        initialValues: {
            fullName: profile.fullName,
            lookingForAJob: true,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            aboutMe: profile.aboutMe,
            contacts: {...profile.contacts}

        },
        onSubmit: values => {
            onSubmit({
                fullName: values.fullName,
                lookingForAJob: values.lookingForAJob,
                lookingForAJobDescription: values.lookingForAJobDescription,
                aboutMe: values.aboutMe,
                contacts:{
                    facebook:values.contacts.facebook,
                    github: values.contacts.github,
                    instagram: values.contacts.instagram,
                    vk: values.contacts.vk,
                    mainLink: values.contacts.mainLink,
                    twitter: values.contacts.twitter,
                    website: values.contacts.website,
                    youtube: values.contacts.youtube
                }
            })
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <button type="submit">save</button>
            <div>
                <b>Full name</b>:
                <input
                    {...formik.getFieldProps("fullName")}
                />
            </div>
            <div>
                <b>Looking for a
                    job</b>:
                <input
                    type={"checkbox"}
                    {...formik.getFieldProps("lookingForAJob")}
                />
            </div>
            <div>
                <b>My professional
                    skills</b>:
                <input
                    {...formik.getFieldProps("lookingForAJobDescription")}/>
            </div>
            <div>
                <b>About me</b>:
                <input
                    {...formik.getFieldProps("aboutMe")}/>
            </div>
            <div>
                <b>Contacts</b>: {profile.contacts && Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contacts}>
                    <b>
                        {key}:
                        <input
                            placeholder={key}
                            {...formik.getFieldProps("contacts." + key)}/></b>
                </div>
            })}
            </div>
        </form>)
}