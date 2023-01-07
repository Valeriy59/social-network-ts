import React from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import {HashRouter, Route, Switch, withRouter} from 'react-router-dom';
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {AuthRedirect} from "./hoc/withAuthRedirect";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import store, {AppReduxStoreType} from "./redux/redux-store";
import Preloader from "./components/Common/Preloader/Preloader";
import {WithSuspense} from "./hoc/withSuspense";
import Login from "./components/Login/LoginFormik";

const DialogsContainer = React.lazy(() => import ("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import ("./components/Profile/ProfileContainer"))

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
            <div className='app'>

            <div className='app-wrapper'>
                <HeaderContainer/>
                <Nav/>
                <div className='app-wrapper-content'>
                    <Switch>
                    <Route path="/profile/:userId?" render={() => {
                        return <React.Suspense fallback={<div>Loading...</div>}>
                            <AuthRedirect><ProfileContainer/></AuthRedirect>
                        </React.Suspense>
                    }}/>
                    <Route path="/dialogs" render={() => {
                        return <WithSuspense>
                            <AuthRedirect><DialogsContainer/></AuthRedirect>
                        </WithSuspense>
                    }}/>
                    <Route path="/settings" render={() => <Settings/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/news" render={() => <News/>}/>
                    <Route path="/users" render={() => <AuthRedirect><UsersContainer/></AuthRedirect>}/>
                    <Route path="/login" render={() => <WithSuspense children={<Login/>}/>}/>
                    </Switch>
                    </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppReduxStoreType) => ({initialized: state.app.initialized})

let AppContainer = compose<React.FC>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

export const MainApp = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
}

export default MainApp