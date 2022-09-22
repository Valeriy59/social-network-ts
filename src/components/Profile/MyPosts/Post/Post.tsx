import React from 'react';
import classes from './Post.module.css'
//  Компонента для профиля, затем импортируется в  App

const Post = (props: any) => {
    return (
        <div className={classes.item}>
            <img src='https://fun-cats.ru/wp-content/uploads/4/b/2/4b28e906802cf608d7d0f2ac5a90459a.jpeg'></img>
            {props.message}
            <div><span>like</span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post