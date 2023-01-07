import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import {DialogsPageType} from "../../redux/state";
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../Common/FormControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validations/validators";
import {Message} from "./Message/Message";


//  Компонента для диалогов, затем импортируется в  App

type DialogsPropsType = {
    sendMessage: (message: string) => void
    dialogsPage: DialogsPageType
    isAuth: boolean
}

const Dialogs = (props: DialogsPropsType) => {
    let state = props.dialogsPage
    let dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} imgSrc={d.imgSrc}/>)
    let messagesElements = state.messages.map(m =>
        <Message key={m.id}
                 id={m.id}
                 avatar={m.avatar}
                 name={m.name}
                 message={m.message}
                 time={m.time}
        />
    )
    const scroll = React.useRef(null)
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
            <div className={s.dialogF} >{messagesElements}
                {/*<div ref={scroll}/>*/}
                <div>
                    <AddMessageFromRedux onSubmit={addNewMessage}/>
                </div>
            </div>
        </div>
    )
}

type AddMessageFormDataType = {
    newMessageBody: string
}

const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div >
                <Field className={s.field} component={Textarea}
                       name={'newMessageBody'}
                       placeholder={'Enter your message'}
                       validate={[required, maxLength50]}
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