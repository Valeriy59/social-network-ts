import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, ProfileUserType} from "../../redux/profile-reducer";
import {AppStateType, StateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";


type MapStatePropsType = {
    profile: ProfileUserType,
    status: string
}
type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void
}
type PathParamsType = {
    userId: string
}
export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType>{
    // после вмонтирования компонента, отправить запрос на сервер
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) { userId = '2'}
        this.props.getUserProfile(userId)
    }
    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.profile.status
})

export default compose<React.FC>(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
)(ProfileContainer)
