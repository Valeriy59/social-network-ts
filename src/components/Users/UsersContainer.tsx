import React from "react";
import {connect} from "react-redux";
import {
    follow,
    setCurrentPage, setFollowingProgress, setIsFetching,
    setTotalUsersCount,
    setUsers,
    unfollow,
    UsersPageType,
    UserType
} from "../../redux/users-reducer";
import {StateType} from "../../redux/redux-store";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {usersAPI} from "../../api/api";


type MapStatePropsType = {
    usersPage: UsersPageType
}
type MapDispatchPropsType = {
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    setUsers: (users: UserType[]) => void,
    setCurrentPage: (pageNumber: number) => void,
    setTotalUsersCount: (totalUsersCount: number) => void,
    setIsFetching: (isFetching: boolean) => void,
    setFollowingProgress: (userId: number, followingInProgress: number[]) => void
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<UsersPropsType>{
    componentDidMount() {
        this.props.setIsFetching(true)
        usersAPI.getUsers(this.props.usersPage.currentPage, this.props.usersPage.pageSize)
            .then(data => {
                this.props.setIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            })
    }
    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.setIsFetching(true)
        usersAPI.getUsers(pageNumber, this.props.usersPage.pageSize)
            .then(data => {
                this.props.setIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
                console.log(data.totalCount)
            })
    }
    render() {
        return (
            <>
                {this.props.usersPage.isFetching ? <Preloader/> : null}
                <Users usersPage={this.props.usersPage}
                       onPageChanged={this.onPageChanged}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       setFollowingProgress={this.props.setFollowingProgress}
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

export default connect(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, setIsFetching, setFollowingProgress})(UsersContainer)
