import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsObjType, MessagesObjType} from "../../index";

//  Компонента для диалогов, затем импортируется в  App

type DialogsPropsType = {
    dialogs: Array<DialogsObjType>
    messages: Array<MessagesObjType>
}

const Dialogs = (props: DialogsPropsType) => {
    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.messages.map(m => <Message message={m.message}/>)
    console.log(props.messages)
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}

export default Dialogs