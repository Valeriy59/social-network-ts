import React from 'react';
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {Store} from "redux";
import StoreContext from '../../StoreContext';

//  Компонента для диалогов, затем импортируется в  App

const DialogsContainer = () => {
    return (
        <StoreContext.Consumer>
            {
            (store) => {
                let state = store.getState().dialogsPage
                let onSendMessageClick = () => {
                    store.dispatch(sendMessageActionCreator())
                }
                let onNewMessageChange = (body:string) => {
                    store.dispatch(updateNewMessageBodyActionCreator(body))
                }
                return (
                    <Dialogs
                        updateNewMessageBody={onNewMessageChange}
                        sendMessage={onSendMessageClick}
                        dialogsPage={state}
                    />
                )
            }
        }
        </StoreContext.Consumer>
    )
}

export default DialogsContainer