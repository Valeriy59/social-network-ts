import React, {memo} from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css'
import {PostObjType} from "../../../redux/state";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validations/validators";
import {Textarea} from "../../Common/FormControls/FormsControls";
import {MyPostsPropsType} from "./MyPostsContainer";
import {useFormik} from "formik";


//  Компонента для профиля, затем импортируется в  App

// type MyPostsPropsType = {
//     posts: Array<PostObjType>
//     newPostText: string
//     addPost: (postText: string) => void
//     // updateNewPostText: (text: string) => void
// }

const MyPosts = memo((props: MyPostsPropsType) => {
    let postsElements = props.posts.map(p => <Post key={p.id} message={p.post} likesCount={p.likesCount}/>)
    // создается ссылка
    // let newPostElement = React.createRef<HTMLTextAreaElement>()
    //
    // //это колбэк функция она отдается кнопке на событие онклик, а онклик ее вызовет
    // let onAddPost = (values: AddNewPostFormDataType) => {
    //         props.addPost(values.newPostText)
    // }

    // let onPostChange = () => {
    //     if (newPostElement.current) {
    //         props.updateNewPostText(newPostElement.current?.value)
    //     }
    // }

    return (
        <div className={s.postsBlock}>
            <hr/>
            <h3>My posts</h3>
            <hr/>
            <NewPostFormik addPost={props.addPost}/>
            <div className={s.posts}>New posts</div>
            {postsElements}
            {/*<AddNewPostFormRedux onSubmit={onAddPost}/>*/}
            {/*<div className={s.posts}>*/}
            {/*    {postsElements}*/}
            {/*</div>*/}
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
            else if (values.newPostText.length>10){errors.newPostText="Max length is 10 symbols"}
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
                    placeholder={'Post message'}
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
// type AddNewPostFormDataType = {
//     newPostText: string
// }
//
// const maxLength10 = maxLengthCreator(10)
//
// const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormDataType>> = (props) => {
//     return(
//         <form onSubmit={props.handleSubmit}>
//             <div>
//                 <Field name={'newPostText'} component={Textarea} validate={[required, maxLength10]}/>
//             </div>
//             <div>
//                 <button>Add post</button>
//             </div>
//         </form>
//     )
// }
//
// const AddNewPostFormRedux = reduxForm<AddNewPostFormDataType>({form: 'profileAddNewPostForm'})(AddNewPostForm)


export default MyPosts