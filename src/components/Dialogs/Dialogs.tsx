import React, {ChangeEvent, ChangeEventHandler} from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {StoreType} from "../../redux/state";
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/dialogs-reducer";


//  Компонента для диалогов, затем импортируется в  App

// type DialogsType = {
//     dialogs: Array<DialogsObjType>
//     messages: Array<MessagesObjType>
//     newMessageBody: string
// }

type DialogsPropsType = {
    store: StoreType
}


const Dialogs = (props: DialogsPropsType) => {
    let state = props.store.getState().dialogsPage
    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message message={m.message}/>)
    let newMessageBody = state.newMessageBody
    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageActionCreator())
    }
    let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.store.dispatch(updateNewMessageBodyActionCreator(body))
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