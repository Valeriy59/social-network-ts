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
import {DialogsObjType, MessagesObjType, PostObjType} from "./index";

export type AppPropsType = {
    posts:Array<PostObjType>
    dialogs: Array<DialogsObjType>
    messages: Array<MessagesObjType>
}


const App = (props: AppPropsType) => {

  return (
      <BrowserRouter>
        <div className='app-wrapper'>
          <Header />
          <Nav />
          <div className='app-wrapper-content'>
              <Route path="/profile" render ={() => <Profile posts={props.posts}/>} />
              <Route path="/dialogs" render ={() => <Dialogs dialogs={props.dialogs}  messages={props.messages}/>} />
              <Route path="/settings" render ={() => <Settings />} />
              <Route path="/music" render ={() => <Music />} />
              <Route path="/news" render ={() => <News />} />
          </div>
        </div>
      </BrowserRouter>
  )
}

export default App;
