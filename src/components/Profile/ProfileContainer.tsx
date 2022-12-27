import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, ProfileUserType, savePhoto, updateStatus} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";


type MapStatePropsType = {
    profile: ProfileUserType,
    status: string
    authorizedUserId: number | null,
    isAuth: boolean
    isOwner: boolean
}
type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void,
    getStatus: (userId: string) => void,
    updateStatus: (status: string) => void,
    savePhoto: (photoFile: File) => void

}
type PathParamsType = {
    userId: string
}
export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType
type ProfileContainerPropsType = RouteComponentProps<PathParamsType> & ProfilePropsType

class ProfileContainer extends React.Component<ProfileContainerPropsType>{

    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId !== null ? this.props.authorizedUserId.toString() : userId
            if (!userId) {
                this.props.history.push("/Login")
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    // после вмонтирования компонента, отправить запрос на сервер
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if(this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                    isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
            />
        )
    }
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    isOwner: state.profilePage.isOwner
})

export default compose<React.FC>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto}),
    withRouter,
)(ProfileContainer)
