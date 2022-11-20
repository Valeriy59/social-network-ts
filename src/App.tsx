import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Route} from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";


// Роут компонента отвечает за строку браузера, запускает рендер в зависимотси от пас
const App = () => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Nav/>
                <div className='app-wrapper-content'>
                    {/*удаляем стор из пропсов у контейнерных компонентов*/}
                    <Route path="/profile/:userId" render={() => <ProfileContainer/>}/>
                    <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                    <Route path="/settings" render={() => <Settings/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/users" render={() => <UsersContainer/>}/>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;
