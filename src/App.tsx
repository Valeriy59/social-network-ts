import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Profile from './components/Profile/Profile';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Route} from 'react-router-dom';
import {ActionsTypes, StoreType} from "./redux/state";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {Store} from "redux";

type StatePropsType = {
    store: Store
    dispatch: (action: ActionsTypes) => void
}
// Роут компонента отвечает за строку браузера, запускает рендер в зависимотси от пас
const App = (props: StatePropsType) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Nav/>
                <div className='app-wrapper-content'>
                    <Route path="/profile" render={() => <Profile
                        store={props.store}/>}
                    />
                    <Route path="/dialogs" render={() => <DialogsContainer
                        store={props.store}/>}
                    />
                    <Route path="/settings" render={() => <Settings/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/news" render={() => <News/>}/>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;
