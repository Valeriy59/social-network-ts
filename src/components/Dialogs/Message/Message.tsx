import React from 'react';
import s from './../Dialogs.module.css'

type MessagePropsType = {
    message: string
}

const Message = (props: MessagePropsType) => {
    return (
        <div className={s.messages}>
            {props.message}
        </div>
    )
}

export default Message