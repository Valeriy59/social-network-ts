import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, ProfileUserType} from "../../redux/profile-reducer";
import {StateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


type MapStatePropsType = {
    profile: ProfileUserType | null,
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


let mapStateToProps = (state: StateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
})

// let WithUrlDataContainerComponent = withRouter(ProfileContainer)
export default withAuthRedirect(withRouter(connect(mapStateToProps, {getUserProfile})(ProfileContainer)))