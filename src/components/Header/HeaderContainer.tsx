import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {getAuthUserData} from "../../redux/auth-reducer";

type MapStatePropsType = {
    login: string
    isAuth: boolean
}
type MapDispatchPropsType = {
    getAuthUserData: () => void
}
export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType


class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount() {
        this.props.getAuthUserData()
    }

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
export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer)