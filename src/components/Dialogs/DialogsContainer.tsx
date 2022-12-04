import React from 'react';
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {DialogsPageType} from "../../redux/state";
import {Redirect} from "react-router-dom";


type MapStatePropsType = {
    dialogsPage: DialogsPageType,
    isAuth: boolean
}
type MapDispatchPropsType = {
    updateNewMessageBody: (body:string) => void,
    sendMessage: () => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        updateNewMessageBody: (body:string) => {
            dispatch(updateNewMessageBodyActionCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageActionCreator())
        }
    }
}

// let AuthRedirectComponent = (props: DialogsPageType) => {
//     if (!this.props.isAuth) {
//         return (
//             <Redirect to={"/Login"}/>
//         )
//     }
//     return (
//         <DialogsContainer {...props}/>
//     )
// }

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer