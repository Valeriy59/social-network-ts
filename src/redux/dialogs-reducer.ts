import {DialogsPageType} from "./state";
export type UpdateNewMessageBodyActionType = {
    type: "UPDATE NEW MESSAGE BODY"
    body: string
}
export type SendMessageActionType = {
    type: "SEND MESSAGE"
}

type ActionsTypes = UpdateNewMessageBodyActionType | SendMessageActionType

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
    ],
    newMessageBody: ''
}

const UPDATE_NEW_MESSAGE_BODY = "UPDATE NEW MESSAGE BODY"
const SEND_MESSAGE = "SEND MESSAGE"

export const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body
            return state
        case SEND_MESSAGE:
            let body = state.newMessageBody
            state.newMessageBody = ''
            state.messages.push({id: 6, message: body})
            return state
        default:
            return state
    }
}

export const sendMessageActionCreator = (): SendMessageActionType => (
    {
        type: SEND_MESSAGE
    }
)
export const updateNewMessageBodyActionCreator = (newMessageBody: string): UpdateNewMessageBodyActionType => (
    {
        type: UPDATE_NEW_MESSAGE_BODY,
        body: newMessageBody
    }
)