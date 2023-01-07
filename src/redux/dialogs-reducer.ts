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
        {id: 1, name: 'Dimych', imgSrc: 'https://w7.pngwing.com/pngs/364/361/png-transparent-account-avatar-profile-user-avatars-icon.png'},
        {id: 2, name: 'Andrey', imgSrc: 'https://avatars.mds.yandex.net/i?id=a043e1fe41eb7805ffa09f1db060debb7d69308d-7698965-images-thumbs&n=13&exp=1'},
        {id: 3, name: 'Sveta', imgSrc: 'https://w7.pngwing.com/pngs/805/207/png-transparent-account-avatar-profile-user-avatars-icon.png'},
        {id: 4, name: 'Sasha', imgSrc: 'https://cdn0.iconfinder.com/data/icons/team-work-and-organization-2/128/78-1024.png'},
        {id: 5, name: 'Viktor', imgSrc: 'https://w7.pngwing.com/pngs/728/963/png-transparent-nauticoncept-custom-arts-store-mobile-phones-user-avatar-miscellaneous-english-heroes.png'},
        {id: 6, name: 'Valera', imgSrc: 'https://w7.pngwing.com/pngs/464/554/png-transparent-account-avatar-profile-user-avatars-icon.png'}
    ],
    messages: [
        {id: 1, avatar: 'https://w7.pngwing.com/pngs/364/361/png-transparent-account-avatar-profile-user-avatars-icon.png',
            name: 'Dimych', message: 'Hello, my friends', time: '12:00'},
        {id: 2, avatar: 'https://avatars.mds.yandex.net/i?id=a043e1fe41eb7805ffa09f1db060debb7d69308d-7698965-images-thumbs&n=13&exp=1',
    name: 'Andrey', message: 'Hi all', time: '12:17'},
        {id: 3,avatar: 'https://w7.pngwing.com/pngs/805/207/png-transparent-account-avatar-profile-user-avatars-icon.png',
            name: 'Sveta', message: 'How is uor course?', time: '12:25'},
        {id: 4,avatar: 'https://cdn0.iconfinder.com/data/icons/team-work-and-organization-2/128/78-1024.png',
            name: 'Sasha', message: 'Everything is fine', time: '12:38'},
        {id: 5,avatar: 'https://w7.pngwing.com/pngs/728/963/png-transparent-nauticoncept-custom-arts-store-mobile-phones-user-avatar-miscellaneous-english-heroes.png',
            name: 'Viktor', message: 'Yo yo yo', time: '12:51'},
        {id: 6,avatar: 'https://w7.pngwing.com/pngs/464/554/png-transparent-account-avatar-profile-user-avatars-icon.png',
            name: 'Valera', message: 'Happy New Year', time: '13:08'}
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