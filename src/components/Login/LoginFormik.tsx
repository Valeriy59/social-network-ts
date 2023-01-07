import React from "react";
import {useFormik} from "formik";
import s from "./Login.module.css"
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppReduxStoreType} from "../../redux/redux-store";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";

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
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
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
                        </FormLabel>
                        <FormGroup>
                            <div>
                                <TextField label="Email" margin="normal"
                                    className={formik.errors.email ? s.error : ""}
                                    placeholder={"email"}
                                    {...formik.getFieldProps("email")}
                                />
                                {formik.touched.email && formik.errors.email &&
                                    <div style={{color: "red"}}>{formik.errors.email}</div>}
                            </div>
                            <div>
                                <TextField type="password" label="Password"
                                           margin="normal"
                                    className={formik.errors.password ? s.error : ""}
                                    placeholder={"password"}
                                    {...formik.getFieldProps("password")}
                                />
                                {formik.touched.password && formik.errors.password &&
                                    <div style={{color: "red"}}>{formik.errors.password}</div>}
                            </div>
                            <div>
                                <FormControlLabel label={'Remember me'}
                                                  control={<Checkbox
                                        checked={formik.values.rememberMe}
                                        {...formik.getFieldProps("rememberMe")}
                                                  />}
                                />
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

                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
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
    return (
    <div className={s.container}>

    <div className={s.loginBlock}>
        <h2>Login</h2>
        <LoginFormik onSubmit={onSubmit} errorMessage={props.authErrorMessage}
                     captchaUrl={props.captchaUrl}/>
    </div></div>
    )
}

export default connect(mapStateToProps, {login})(Login)