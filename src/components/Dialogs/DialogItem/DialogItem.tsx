import React from 'react';
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

type DialogType = {
    name: string
    id: number
    imgSrc: string
}

const DialogItem = (props: DialogType) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={s.dialog + ' ' + s.active}>
            <img src={props.imgSrc} alt={'avatar'}/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem