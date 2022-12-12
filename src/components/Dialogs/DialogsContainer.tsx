import React from 'react';
import {sendMessageActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {DialogsPageType} from "../../redux/state";



type MapStatePropsType = {
    dialogsPage: DialogsPageType,
    isAuth: boolean
}
type MapDispatchPropsType = {
    // updateNewMessageBody: (body:string) => void,
    sendMessage: (newMessageBody: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        // updateNewMessageBody: (body:string) => {
        //     dispatch(updateNewMessageBodyActionCreator(body))
        // },
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageActionCreator(newMessageBody))
        }
    }
}



const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer