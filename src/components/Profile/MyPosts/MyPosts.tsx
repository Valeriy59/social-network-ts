import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css'
//  Компонента для профиля, затем импортируется в  App

const MyPosts = () => {
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
                <Post message="Hi, how are you?" likesCount="23"/>
                <Post message="It's my first post" likesCount="89"/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>
    )
}

export default MyPosts