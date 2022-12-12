import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogsPageType} from "../../redux/state";
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../Common/FormControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validations/validators";

//  Компонента для диалогов, затем импортируется в  App

type DialogsPropsType = {
    sendMessage: (message: string) => void
    // updateNewMessageBody: (body: string) => void
    dialogsPage: DialogsPageType
    isAuth: boolean
}

const Dialogs = (props: DialogsPropsType) => {
    let state = props.dialogsPage
    let dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message key={m.id} message={m.message}/>)
    // let newMessageBody = state.newMessageBody
    // let onSendMessageClick = () => {
    //     props.sendMessage()
    // }
    // let onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     let body = e.target.value
    //     props.updateNewMessageBody(body)
    // }
    let addNewMessage = (values: AddMessageFormDataType) => {
        props.sendMessage(values.newMessageBody)
    }
    if (!props.isAuth) {
        return <Redirect to={"/Login"}/>
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFromRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

type AddMessageFormDataType = {
    newMessageBody: string
}

const maxLength50 = maxLengthCreator(50)

const AddMessageForm : React.FC<InjectedFormProps<AddMessageFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name={'newMessageBody'}
                       placeholder={'Enter your message'}
                       validate={[required,maxLength50]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFromRedux = reduxForm<AddMessageFormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs