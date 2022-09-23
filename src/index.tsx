import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

export type PostObjType = {
    id: number
    post: string
    likesCount: number
}

export type DialogsObjType = {
    id: number
    name: string
}

export type MessagesObjType = {
    id: number
    message: string
}

let posts: Array<PostObjType> = [
    {id: 1, post:'Hi, how are you?', likesCount: 12},
    {id: 2, post:"It's my first post", likesCount: 11},
    {id: 3, post:'How are you?', likesCount: 10},
    {id: 4, post:'yo', likesCount: 14},
    {id: 5, post:'yo', likesCount: 19},
    {id: 6, post:'yo', likesCount: 10},
    {id: 7, post:'324f', likesCount:24}
]

let dialogs: Array<DialogsObjType> = [
    {id: 1, name:'Dimych'},
    {id: 2, name:'Andrey'},
    {id: 3, name:'Sveta'},
    {id: 4, name:'Sasha'},
    {id: 5, name:'Viktor'},
    {id: 6, name:'Valera'}
]

let messages: Array<MessagesObjType> = [
    {id: 1, message:'Hi'},
    {id: 2, message:'How is your data?'},
    {id: 3, message:'How are you?'},
    {id: 4, message:'yo'},
    {id: 5, message:'yo'},
    {id: 6, message:'yo'}
]

ReactDOM.render(<App posts={posts} dialogs={dialogs} messages={messages}/>,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
