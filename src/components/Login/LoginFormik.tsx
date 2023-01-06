import React from "react";
import {useFormik} from "formik";
import s from "./Login.module.css"
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppReduxStoreType} from "../../redux/redux-store";

type PropsType = {
    onSubmit: (values: LoginValuesType) => void
    errorMessage: string | null
    captchaUrl: string | null
}
type LoginValuesType = {
    email: string
    password: string
    rememberMe: boolean,
    captcha: string | null
}
export const LoginFormik = (props: PropsType) => {
    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
            captcha: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Required"
            } else if (values.password.length < 3) {
                errors.password = "should be > 2"
            }
            return errors;
        },
        onSubmit: values => {
            props.onSubmit({
                email: values.email,
                password: values.password,
                rememberMe: values.rememberMe,
                captcha: values.captcha
            })
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <p>To log in get registered
                    <a href={"https://social-network.samuraijs.com/"}
                       target={"_blank"} rel="noreferrer"> here
                    </a>
                </p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
            </div>
            <div>
                <input
                    className={formik.errors.email ? s.error : ""}
                    placeholder={"email"}
                    {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email &&
                    <div style={{color: "red"}}>{formik.errors.email}</div>}
            </div>
            <div>
                <input
                    className={formik.errors.password ? s.error : ""}
                    placeholder={"password"}
                    {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password &&
                    <div style={{color: "red"}}>{formik.errors.password}</div>}
            </div>
            <div>
                <label className="checkbox-input">
                    <input
                        type={"checkbox"}
                        checked={formik.values.rememberMe}
                        {...formik.getFieldProps("rememberMe")}
                    />
                    Remember Me
                </label>
            </div>
            <div>
                {props.captchaUrl && <img alt='captcha' src={props.captchaUrl}/>}
            </div>
            <div>
                {props.captchaUrl && <input
                    placeholder={"symbols from image"}
                    {...formik.getFieldProps("captcha")}
                />}
            </div>

            {props.errorMessage && <div className={s.error}>{props.errorMessage}</div>}

            <button type="submit">Login</button>
        </form>
    );
};
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captchaUrl: string | null) => void

}
const mapStateToProps = (state: AppReduxStoreType) => {
    return {
        isAuth: state.auth.isAuth,
        authErrorMessage: state.auth.authErrorMessage,
        captchaUrl: state.auth.captchaUrl
    }
}
type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType
const Login = (props: LoginPropsType) => {
    const onSubmit = (values: LoginValuesType) => {
        props.login(values.email, values.password, values.rememberMe, values.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/Profile"}/>
    }
    return <div>
        <h2>Log In</h2>
        <LoginFormik onSubmit={onSubmit} errorMessage={props.authErrorMessage}
                     captchaUrl={props.captchaUrl}/>
    </div>
}

export default connect(mapStateToProps, {login})(Login)