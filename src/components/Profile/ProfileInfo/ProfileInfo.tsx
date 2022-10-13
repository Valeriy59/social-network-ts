import React from 'react';
import s from './ProfileInfo.module.css'

type ProfileInfoType ={

}

const ProfileInfo = (props: ProfileInfoType) => {
    return (
        <div>
            <div>
                {/*<img src="http://skalsa.ru/images/bt_property/91/3.jpg"></img>*/}
            </div>
            <div className={s.descriptionBlock}>
                ava + desc
            </div>
        </div>
    )
}


export default ProfileInfo