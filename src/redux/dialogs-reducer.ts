import {DialogsPageType} from "./state";
export type UpdateNewMessageBodyActionType = {
    type: "UPDATE NEW MESSAGE BODY"
    body: string
}
export type SendMessageActionType = {
    type: "SEND MESSAGE"
}

type ActionsTypes = UpdateNewMessageBodyActionType | SendMessageActionType

const UPDATE_NEW_MESSAGE_BODY = "UPDATE NEW MESSAGE BODY"
const SEND_MESSAGE = "SEND MESSAGE"

export const dialogsReducer = (state: DialogsPageType, action: ActionsTypes) => {
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