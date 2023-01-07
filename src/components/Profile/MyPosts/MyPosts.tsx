import React, {memo} from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css'
import {MyPostsPropsType} from "./MyPostsContainer";
import {useFormik} from "formik";

const MyPosts = memo((props: MyPostsPropsType) => {
    let postsElements = props.posts.map(p => <Post key={p.id} message={p.post} likesCount={p.likesCount} />)

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div className={s.addPost}>
            <NewPostFormik addPost={props.addPost}/>
            </div>
            {postsElements}
        </div>
    )
})

type NewPostFormikPropsType = {
    addPost: (newPostText: string) => void
}
type FormikErrorType = {
    newPostText?: string
}

export const NewPostFormik = (props: NewPostFormikPropsType) => {
    const formik = useFormik({
        initialValues: {
            newPostText: '',
        },
        validate: values => {
            const errors: FormikErrorType = {}
            if (!values.newPostText){errors.newPostText='Required'}
            else if (values.newPostText.length>1000){errors.newPostText="Max length is 1000 symbols"}
            return errors
        },
        onSubmit: values => {
            props.addPost(values.newPostText)

        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <textarea
                    className = {formik.errors.newPostText? s.error : ''}
                    placeholder={`What's new?`}
                    {...formik.getFieldProps('newPostText')}
                />
                {formik.touched.newPostText && formik.errors.newPostText && <div style={{color:'red'}}>{formik.errors.newPostText}</div>}
            </div>
            <div>
                <button type="submit">Add post</button>
            </div>
        </form>
    )
}

export default MyPosts