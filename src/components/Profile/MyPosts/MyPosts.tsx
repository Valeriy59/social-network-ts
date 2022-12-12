import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css'
import {PostObjType} from "../../../redux/state";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validations/validators";
import {Textarea} from "../../Common/FormControls/FormsControls";


//  Компонента для профиля, затем импортируется в  App

type MyPostsPropsType = {
    posts: Array<PostObjType>
    newPostText: string
    addPost: (postText: string) => void
    // updateNewPostText: (text: string) => void
}

const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.posts.map(p => <Post key={p.id} message={p.post} likesCount={p.likesCount}/>)
    // создается ссылка
    let newPostElement = React.createRef<HTMLTextAreaElement>()

    //это колбэк функция она отдается кнопке на событие онклик, а онклик ее вызовет
    let onAddPost = (values: AddNewPostFormDataType) => {
            props.addPost(values.newPostText)
    }

    // let onPostChange = () => {
    //     if (newPostElement.current) {
    //         props.updateNewPostText(newPostElement.current?.value)
    //     }
    // }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

type AddNewPostFormDataType = {
    newPostText: string
}

const maxLength10 = maxLengthCreator(10)

const AddNewPostForm: React.FC<InjectedFormProps<AddNewPostFormDataType>> = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={Textarea} validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm<AddNewPostFormDataType>({form: 'profileAddNewPostForm'})(AddNewPostForm)


export default MyPosts