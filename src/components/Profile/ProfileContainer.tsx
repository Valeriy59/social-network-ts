import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileUserType, setUserProfile} from "../../redux/profile-reducer";
import {ProfilePageType} from "../../redux/state";
import {StateType} from "../../redux/redux-store";

type MapStatePropsType = {
    profile: ProfileUserType
}
type MapDispatchPropsType = {
    setUserProfile: (profile: ProfileUserType) => void
}

export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType
class ProfileContainer extends React.Component<ProfilePropsType>{
    // после вмонтирования компонента, отправить запрос на сервер
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }
    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}
let mapStateToProps = (state: StateType): MapStatePropsType => ({
    profile: state.profilePage.profile
})
export default connect(mapStateToProps, {setUserProfile})(ProfileContainer)