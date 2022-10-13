import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css'
import {PostObjType} from "../../../redux/state";

//  Компонента для профиля, затем импортируется в  App

type MyPostsPropsType = {
    posts: Array<PostObjType>
    newPostText: string
    addPost: () => void  // need to fix any
    updateNewPostText: (newPostText: string) => void
}

const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.posts.map(p => <Post message={p.post} likesCount={p.likesCount}/>)
    // создается ссылка
    let newPostElement = React.createRef<HTMLTextAreaElement>()

    //это колбэк функция она отдается кнопке на событие онклик, а онклик ее вызовет
    let addPost = () => {
        if (newPostElement.current) {
            props.addPost()
        }
    }

    let onPostChange = () => {
        let text = newPostElement.current?.value
        if (newPostElement.current) {
            props.updateNewPostText(newPostElement.current?.value)
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText}></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts