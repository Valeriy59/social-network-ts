import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

//перерисовка всего дерева для отображения нового поста
export let rerenderEntireTree = () => {
    //находим элемент рут и отрисовываем Апп
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,  document.getElementById('root'));
}
