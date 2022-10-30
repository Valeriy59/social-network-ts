import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from "react-router-dom";
import store from "./redux/redux-store";

//перерисовка всего дерева для отображения нового поста
export let rerenderEntireTree = () => {
    //находим элемент рут и отрисовываем Апп
    ReactDOM.render(
        <BrowserRouter>
            <App store={store} dispatch={store.dispatch.bind(store)}/>
        </BrowserRouter>,  document.getElementById('root'));
}
