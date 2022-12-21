import React from 'react'
import styles from "../../Paginator/Paginator.module.css";
import {UsersPageType} from "../../../redux/users-reducer";



type PaginatorPropsType = {
    usersPage: UsersPageType,
    onPageChanged: (pageNumber: number) => void,
}

// Презентационная компонента - чистая функция, которая возвращает jsx
const Paginator: React.FC<PaginatorPropsType> = ({usersPage, onPageChanged, ...props}) => {
    let state = usersPage
    let pagesCount = Math.ceil(state.totalUsersCount / state.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map((p,index) => {
                    return <span key={index} className={state.currentPage === p ? styles.selectedPage : ''}
                                 onClick = {() => {onPageChanged(p)}}>{p}</span>
                })}
            </div>

        </div>
    )
}

export default Paginator