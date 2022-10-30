import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {StoreType} from "../../../redux/state";
import MyPosts from "./MyPosts";
import {Store} from "redux";

//  Компонента для профиля, затем импортируется в  App

type MyPostsPropsType = {
    store: Store
    // addPost: () => void
    // updateNewPostText: (text: string) => void
}

const MyPostsContainer = (props: MyPostsPropsType) => {
    let state = props.store.getState().profilePage
    //это колбэк функция она отдается кнопке на событие онклик, а онклик ее вызовет
    let addPost = (postText: string) => {
            props.store.dispatch(addPostActionCreator(postText))
    }

    let onPostChange = (newText: string) => {
            props.store.dispatch(updateNewPostTextActionCreator(newText))
    }

    return (
        <MyPosts posts={state.posts} newPostText={state.newPostText} addPost={addPost} updateNewPostText={onPostChange}/>
    )
}

export default MyPostsContainer