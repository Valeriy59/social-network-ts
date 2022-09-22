import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
      <BrowserRouter>
        <div className='app-wrapper'>
          <Header />
          <Nav />
          <div className='app-wrapper-content'>
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/dialogs/*" element={<Dialogs />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/music" element={<Music />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
  )
}

export default App;
