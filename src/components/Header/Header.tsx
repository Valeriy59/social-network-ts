import React from 'react';
import classes from'./Header.module.css'
import {NavLink} from "react-router-dom";
//  Компонента для хедера, затем импортируется в  App

type HeaderPropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
    // setAuthUserData: (userId: number, email: string, login: string) => void
}

const Header = (props: HeaderPropsType) => {
    return (
        <header className={classes.header}>{props.login}
            {/* <img src='https://st-martin.ru/800/600/https/yt3.ggpht.com/a/AATXAJwlb4OFgfzmzyNmNIwWwcWvcb-K-Ifv7QQB2bVUrw=s900-c-k-c0xffffffff-no-rj-mo'></img> */}
        <div className={classes.loginBlock}>
            {props.isAuth
                ? <div>
                    {props.login}
                    <button onClick={props.logout}>Logout</button>
                  </div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
        </header>
    )
}

export default Header