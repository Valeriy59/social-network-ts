import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {Store} from "redux";
import StoreContext from '../../../StoreContext';

//  Контейнерная компонента для работы со стором

// Стор достаем из контекста а не из пропсов
const MyPostsContainer = () => {
    return (
        // обращаемся к стору через контекст - функция которая принимает стор и возвращает jsx разметку
        <StoreContext.Consumer>{
            (store) => {
                let state = store.getState().profilePage
                let addPost = (postText: string) => {
                    store.dispatch(addPostActionCreator(postText))
                }
                let onPostChange = (newText: string) => {
                    store.dispatch(updateNewPostTextActionCreator(newText))
                }
                return (
                    <MyPosts
                        posts={state.posts}
                        newPostText={state.newPostText}
                        addPost={addPost}
                        updateNewPostText={onPostChange}
                    />
                )
            }
        }
        </StoreContext.Consumer>
    )
}

export default MyPostsContainer