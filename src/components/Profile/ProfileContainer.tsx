import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, ProfileType, savePhoto, updateStatus} from "../../redux/profile-reducer";
import {AppReduxStoreType} from "../../redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose, Dispatch} from "redux";
import {ProfileFormikType} from "./ProfileInfo/ProfileDataForm";


type MapStatePropsType = {
    profile: ProfileType,
    status: string
    authorizedUserId: number | null,
    isAuth: boolean
    isOwner: boolean
    errorMessage: string
}
type MapDispatchPropsType = {
    getUserProfile: (userId: string) => void,
    getStatus: (userId: string) => void,
    updateStatus: (status: string) => (dispatch: Dispatch) => void,
    savePhoto: (photoFile: File) => (dispatch: Dispatch) => void,
    saveProfile: (profile: ProfileFormikType) => (dispatch: Dispatch) => void

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
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
                     errorMessage={this.props.errorMessage}
            />
        )
    }
}


let mapStateToProps = (state: AppReduxStoreType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    isOwner: state.profilePage.isOwner,
    errorMessage: state.profilePage.profileErrorMessage
})

export default compose<React.FC>(
    connect(mapStateToProps, {
        getUserProfile,
        getStatus,
        updateStatus,
        savePhoto,
        // saveProfile
    }),
    withRouter
)(ProfileContainer)
