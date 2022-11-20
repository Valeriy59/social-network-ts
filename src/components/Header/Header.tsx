import React from 'react';
import classes from'./Header.module.css'
import {NavLink} from "react-router-dom";
import {AuthPageType, setAuthUserData} from "../../redux/auth-reducer";
//  Компонента для хедера, затем импортируется в  App

type HeaderPropsType = {
    login: string,
    isAuth: boolean
    // setAuthUserData: (userId: number, email: string, login: string) => void
}

const Header = (props: HeaderPropsType) => {
    return (
        <header className={classes.header}>{props.login}
            {/* <img src='https://st-martin.ru/800/600/https/yt3.ggpht.com/a/AATXAJwlb4OFgfzmzyNmNIwWwcWvcb-K-Ifv7QQB2bVUrw=s900-c-k-c0xffffffff-no-rj-mo'></img> */}
        <div className={classes.loginBlock}>
            {props.isAuth ? props.login :
            <NavLink to={'/login'}>Login</NavLink>}
        </div>
        </header>
    )
}

export default Header