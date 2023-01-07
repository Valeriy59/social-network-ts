import React from 'react';
import classes from './Post.module.css'
import avatar from "../../../../assets/images/img.png"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
//  Компонента для профиля, затем импортируется в  App

type PostPropsType = {
    message: string,
    likesCount: number,
    // userName: string | undefined,
    // userAvatar: string | null | undefined
}

const Post = (props: PostPropsType) => {
    return (
        <div className={classes.item}>
            <div className={classes.avatarAndName}>
            <img
                src={avatar}
                 // src={props.userAvatar !== null ? props.userAvatar : avatar}
                 alt={'avatar'}/>
                {/*<h5>{props.userName}</h5>*/}
            </div>
            <span className={classes.message}>{props.message}</span>
            <div className={classes.likes}><span><FavoriteBorderIcon fontSize={'small'}/></span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post