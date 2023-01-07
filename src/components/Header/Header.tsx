import React from 'react';
import classes from'./Header.module.css'
import {NavLink} from "react-router-dom";
import logo from "../../assets/images/logo.jpg"
import {IconButton} from "@material-ui/core";
import {ExitToApp} from "@material-ui/icons";
//  Компонента для хедера, затем импортируется в  App

type HeaderPropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
    // setAuthUserData: (userId: number, email: string, login: string) => void
}

const Header = (props: HeaderPropsType) => {
    return (
        <header className={classes.header}>
            <img src={logo}/>
            <div className={classes.loginBlock}>
                {props.isAuth
                    ? <div>
                        <span>{props.login}</span>
                        <IconButton onClick={props.logout} style={{color: 'black'}}>
                            <ExitToApp/>
                        </IconButton>
                        {/*<button onClick={props.logout}>Logout</button>*/}
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header