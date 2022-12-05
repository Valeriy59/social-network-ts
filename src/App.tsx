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
import Login from "./components/Login/Login";
import {AuthRedirect} from "./hoc/withAuthRedirect";


// Роут компонента отвечает за строку браузера, запускает рендер в зависимотси от пас
const App = () => {
    return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Nav/>
                <div className='app-wrapper-content'>
                    {/*удаляем стор из пропсов у контейнерных компонентов*/}
                    <Route path="/profile/:userId?" render={() => <AuthRedirect><ProfileContainer/></AuthRedirect>}/>
                    <Route path="/dialogs" render={() => <AuthRedirect><DialogsContainer/></AuthRedirect>}/>
                    <Route path="/settings" render={() => <Settings/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/users" render={() => <AuthRedirect><UsersContainer/></AuthRedirect>}/>
                    <Route path="/login" render={() => <Login/>}/>
                </div>
            </div>
    )
}

export default App;
