import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {logout} from "../../redux/auth-reducer";

type MapStatePropsType = {
    login: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    logout: () => void
}
export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType


class HeaderContainer extends React.Component<HeaderPropsType> {


    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {logout})(HeaderContainer)