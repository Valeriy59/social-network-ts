import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsObjType, MessagesObjType} from "../../redux/state";

//  Компонента для диалогов, затем импортируется в  App

type DialogsType = {
    dialogs: Array<DialogsObjType>
    messages: Array<MessagesObjType>
}

type DialogsPropsType = {
    state: DialogsType
}


const Dialogs = (props: DialogsPropsType) => {
    let dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = props.state.messages.map(m => <Message message={m.message}/>)
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