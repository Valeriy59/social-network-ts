import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {addPost, RootStateType} from "./redux/state";
import {BrowserRouter} from "react-router-dom";

//перерисовка всего дерева для отображения нового поста
export let rerenderEntireTree = (state: RootStateType) => {
    //находим элемент рут и отрисовываем Апп
    ReactDOM.render(
        <BrowserRouter>
            <App state={state} addPost={addPost}/>
        </BrowserRouter>,  document.getElementById('root'));
}
