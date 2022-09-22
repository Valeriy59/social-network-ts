import React from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";

//  Компонента для диалогов, затем импортируется в  App

type DialogType = {
    name: string
    id: number
}

const DialogItem = (props: DialogType) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

type MessageType = {
    message: string
}

const Message = (props: MessageType) => {
    return (
        <div className={s.messages}>{props.message}</div>
    )
}

const Dialogs = (props: any) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name={"Dimych"} id={1}/>
                <DialogItem name={"Andrey"} id={2}/>
                <DialogItem name={"Sveta"} id={3}/>
                <DialogItem name={"Sasha"} id={4}/>
                <DialogItem name={"Viktor"} id={5}/>
                <DialogItem name={"Valera"} id={6}/>
            </div>
            <div className={s.messages}>
                <Message message={"Hi"}/>
                <Message message={"How is your data?"}/>
                <Message message={"How are you?"}/>
            </div>
        </div>
    )
}

export default Dialogs