import React from 'react'
import {UsersPropsType} from "./UsersContainer";
import axios from "axios";
import userPhoto from "../../assets/images/img.jpg"
import styles from "./Users.module.css"

// Классовая компонента

class Users extends React.Component<UsersPropsType>{
    componentDidMount() {
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`)
                .then(response => {this.props.setUsers(response.data.items)})
    }
    onPageChanged = (pageNumber: number) => {

        this.props.setCurrentPage(pageNumber)
         axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersPage.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
                console.log(response.data.totalCount)
            })
    }

    render() {
        let state = this.props.usersPage
        let pagesCount = Math.ceil(state.totalUsersCount / state.pageSize)
        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        return (
            <div>
                <div>
                    {pages.map(p => {
                        return <span className={state.currentPage === p ? styles.selectedPage : ''}
                                     onClick = {() => {this.onPageChanged(p)}}>{p}</span>
                    })}
                </div>
                {
                    state.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {this.props.follow(u.id)}}>Unfollow</button>
                            : <button onClick={() => {this.props.unfollow(u.id)}}>Follow</button>}
                    </div>
                </span>
                        <span>
                        <span>
                           <div>{u.name}</div>
                           <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{'u.location.country'}</div>
                            <div>{'u.location.city'}</div>
                        </span>
                    </span>
                    </div>)
                }
            </div>
        )
    }
}
export default Users