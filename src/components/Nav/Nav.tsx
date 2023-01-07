import React from 'react';
import s from './Nav.module.css'
import {NavLink} from 'react-router-dom'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import InboxIcon from '@material-ui/icons/Inbox';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
//  Компонента для навигационного меню, затем импортируется в  App

const Nav = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <PersonOutlineIcon fontSize={'small'}/>
                <NavLink to='/profile' activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <ChatBubbleOutlineIcon fontSize={'small'}/>
                <NavLink to='/dialogs' activeClassName={s.activeLink}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <InboxIcon fontSize={'small'}/>
                <NavLink to='/news' activeClassName={s.activeLink}>News</NavLink>
            </div>
            <div className={s.item}>
                <MusicVideoIcon fontSize={'small'}/>
                <NavLink to='/music' activeClassName={s.activeLink}>Music</NavLink>
            </div>
            <div className={s.item}>
                <SettingsIcon fontSize={'small'}/>
                <NavLink to='/settings' activeClassName={s.activeLink}>Settings</NavLink>
            </div>
            <div className={s.item}>
                <PeopleOutlineIcon fontSize={'small'}/>
                <NavLink to='/users' activeClassName={s.activeLink}>Users</NavLink>
            </div>
        </nav>
    )
}

export default Nav