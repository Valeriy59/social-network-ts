import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {Dispatch} from "redux";
import {PostObjType} from "../../../redux/state";
import {AppStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";


//  Контейнерная компонента для работы со стором

type MapStatePropsType = {
    posts: Array<PostObjType>,
    newPostText: string
}
type MapDispatchPropsType = {
    addPost: (postText: string) => void,
    updateNewPostText: (newText: string) => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (postText: string) => {
            dispatch(addPostActionCreator(postText))
        },
        updateNewPostText: () => (newText: string) => {
            dispatch(updateNewPostTextActionCreator(newText))
        }
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer

