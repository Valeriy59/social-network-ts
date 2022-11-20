import React from 'react';
import Header from "./Header";
import {setAuthUserData} from "../../redux/auth-reducer";
import axios from "axios";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";

type MapStatePropsType = {
    login: string
    isAuth: boolean
}
type MapDispatchPropsType = {
    setAuthUserData: (userId: number, email: string, login: string) => void
}
export type HeaderPropsType = MapStatePropsType & MapDispatchPropsType


class HeaderContainer extends React.Component<HeaderPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }
            })
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
export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)