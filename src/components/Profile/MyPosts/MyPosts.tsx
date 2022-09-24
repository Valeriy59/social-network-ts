import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css'
import {PostObjType} from "../../../redux/state";

//  Компонента для профиля, затем импортируется в  App

type MyPostsPropsType = {
    posts: Array<PostObjType>
}

const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.posts.map(p => <Post message={p.post} likesCount={p.likesCount}/>)
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts