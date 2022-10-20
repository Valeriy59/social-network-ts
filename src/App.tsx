import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Route} from 'react-router-dom';
import {ActionsTypes, StoreType} from "./redux/state";

// export type AppPropsType = {
//     posts:Array<PostObjType>
//     dialogs: Array<DialogsObjType>
//     messages: Array<MessagesObjType>
// }
type StatePropsType = {
    store: StoreType
    dispatch: (action: ActionsTypes) => void
}
// Роут компонента отвечает за строку браузера, запускает рендер в зависимотси от пас
const App = (props: StatePropsType) => {
    const state = props.store.getState()
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Nav/>
                <div className='app-wrapper-content'>
                    <Route path="/profile" render={() => <Profile
                        profilePage={state.profilePage}
                        newPostText={state.profilePage.newPostText}
                        dispatch={props.store.dispatch}/>}
                    />
                    <Route path="/dialogs" render={() => <Dialogs
                        store={props.store}
                    />}
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
