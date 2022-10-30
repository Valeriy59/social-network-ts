import React, {ChangeEvent, ChangeEventHandler} from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPageType, StoreType} from "../../redux/state";
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/dialogs-reducer";

//  Компонента для диалогов, затем импортируется в  App

type DialogsPropsType = {
    sendMessage: () => void
    updateNewMessageBody: (body: string) => void
    dialogsPage: DialogsPageType
}

const Dialogs = (props: DialogsPropsType) => {
    let state = props.dialogsPage
    let dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message key={m.id} message={m.message}/>)
    let newMessageBody = state.newMessageBody
    let onSendMessageClick = () => {
        props.sendMessage()
    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.updateNewMessageBody(body)
        // props.store.dispatch(updateNewMessageBodyActionCreator(body))
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <textarea
                            value={newMessageBody}
                            onChange={onNewMessageChange}
                            placeholder={"Enter your message"}
                        >
                        </textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs