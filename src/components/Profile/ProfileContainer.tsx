import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileUserType, setUserProfile} from "../../redux/profile-reducer";
import {ProfilePageType} from "../../redux/state";
import {StateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";

type MapStatePropsType = {
    profile: ProfileUserType
}
type MapDispatchPropsType = {
    setUserProfile: (profile: ProfileUserType) => void
}
type PathParamsType = {
    userId: string
}
export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>


class ProfileContainer extends React.Component<ProfilePropsType>{
    // после вмонтирования компонента, отправить запрос на сервер
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) { userId = '2'}
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
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

// let withUrlDataContainer = withRouter(ProfileContainer)
export default withRouter(connect(mapStateToProps, {setUserProfile})(ProfileContainer))