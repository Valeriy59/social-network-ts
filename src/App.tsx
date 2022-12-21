import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {AuthRedirect} from "./hoc/withAuthRedirect";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import store, {AppStateType} from "./redux/redux-store";
import Preloader from "./components/Common/Preloader/Preloader";

type MapDispatchPropsType = {
    initialized: boolean
    initializeApp: () => void
}
// Роут компонента отвечает за строку браузера, запускает рендер в зависимотси от пас
class App extends React.Component<MapDispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Nav/>
                <div className='app-wrapper-content'>
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
}

const mapStateToProps = (state: AppStateType) => ({initialized: state.app.initialized})

let AppContainer = compose<React.FC>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

export const MainApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default MainApp