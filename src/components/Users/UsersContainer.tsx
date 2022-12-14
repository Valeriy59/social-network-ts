import React from "react";
import {connect} from "react-redux";
import {
    followTC, requestUsersTC,
    setCurrentPage, setFollowingProgress,
    unfollowTC,
    UsersPageType
} from "../../redux/users-reducer";
import {StateType} from "../../redux/redux-store";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {compose} from "redux";




type MapStatePropsType = {
    usersPage: UsersPageType
}
type MapDispatchPropsType = {
    followTC: (userId: number) => void,
    unfollowTC: (userId: number) => void,
    setCurrentPage: (pageNumber: number) => void,
    setFollowingProgress: (userId: number, followingInProgress: boolean) => void,
    getUsersTC: (currentPage: number, pageSize: number) => void
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<UsersPropsType>{
    componentDidMount() {
        const {currentPage, pageSize} = this.props.usersPage
        this.props.getUsersTC(currentPage, pageSize)
    }
    onPageChanged = (pageNumber: number) => {
        // const { pageSize} = this.props.usersPage.pageSize
        this.props.getUsersTC(pageNumber, this.props.usersPage.pageSize)
    }
    render() {
        return (
            <>
                {this.props.usersPage.isFetching ? <Preloader/> : null}
                <Users usersPage={this.props.usersPage}
                       onPageChanged={this.onPageChanged}
                       followTC={this.props.followTC}
                       unfollowTC={this.props.unfollowTC}
                />
            </>
        )
    }
}


let mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        usersPage: state.usersPage
    }
}

export default compose<React.FC>(
    connect(mapStateToProps, {followTC, unfollowTC, setCurrentPage, setFollowingProgress, getUsersTC: requestUsersTC})
)(UsersContainer)
