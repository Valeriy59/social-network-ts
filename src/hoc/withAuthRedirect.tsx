import React, {ComponentType, FC} from "react";
import {Redirect} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {AppReduxStoreType} from "../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppReduxStoreType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

/*export function withAuthRedirect<T>(Component: React.ComponentType<T>) {
    const RedirectComponent = (props: MapStatePropsType) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Redirect to={"/Login"}/>


        return <Component {...restProps as T}/>

    }
    let ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)
    return ConnectedRedirectComponent
}*/

export const AuthRedirect: FC = ({children}) => {

    const isAuth = useSelector<AppReduxStoreType, boolean>(state => state.auth.isAuth)
    console.log(isAuth)
    if (!isAuth) return <Redirect to={"/Login"}/>

    return <>{children}</>
}