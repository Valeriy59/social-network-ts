import React from 'react';
import {DialogsPageType, StoreType} from "../../redux/state";
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {Store} from "redux";

//  Компонента для диалогов, затем импортируется в  App

type DialogsPropsType = {
    store: Store
    // updateNewMessageBody: () => void
    // sendMessage: () => void
    // dialogsPage: DialogsPageType
}

const DialogsContainer = (props: DialogsPropsType) => {
    let state = props.store.getState().dialogsPage
    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageActionCreator())
    }
    let onNewMessageChange = (body:string) => {
        props.store.dispatch(updateNewMessageBodyActionCreator(body))
    }
    return (
        <Dialogs
            updateNewMessageBody={onNewMessageChange}
            sendMessage={onSendMessageClick}
            dialogsPage={state}
        />
    )
}

export default DialogsContainer