import {DialogsPageType} from "./state";
// export type UpdateNewMessageBodyActionType = {
//     type: "UPDATE NEW MESSAGE BODY"
//     body: string
// }
export type SendMessageActionType = {
    type: "SEND MESSAGE",
    body: string
}

export type DialogsActionsTypes = SendMessageActionType

export type DialogsType = {
    id: number
    name: string
    src: string
}

export type MessageType = {
    id: number
    avatar: string
    name: string
    message: string
    time: any
}

export type DialogsReducerType = {
    dialogs: Array<DialogsType>
    message: Array<MessageType>
}
let initialState: DialogsPageType = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your data?'},
        {id: 3, message: 'How are you?'},
        {id: 4, message: 'yo'},
        {id: 5, message: 'yo'},
        {id: 6, message: 'yo'}
    ]
}

// const UPDATE_NEW_MESSAGE_BODY = "UPDATE NEW MESSAGE BODY"
const SEND_MESSAGE = "SEND MESSAGE"

export const dialogsReducer = (state: DialogsPageType = initialState, action: DialogsActionsTypes) => {
    switch (action.type) {
        // case UPDATE_NEW_MESSAGE_BODY:
        //     return {...state, newMessageBody: action.body};
        case SEND_MESSAGE:
            let body = action.body;
            return {...state, messages: [...state.messages, {id: 7, message: body}]};
        default:
            return state;
    }
}

export const sendMessageActionCreator = (newMessageBody: string): SendMessageActionType => (
    {
        type: SEND_MESSAGE,
        body: newMessageBody
    }
)
// export const updateNewMessageBodyActionCreator = (newMessageBody: string): UpdateNewMessageBodyActionType => (
//     {
//         type: UPDATE_NEW_MESSAGE_BODY,
//         body: newMessageBody
//     }
// )