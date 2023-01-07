import React from "react";
import styles from "./FormsControls.module.css"
import {Field} from "redux-form";
import {required} from "../../../utils/validations/validators";
import {TextField} from "@material-ui/core";

export const FormControl = ({input, meta: {touched, error}, children}: any) => {
    const hasError = touched && error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props: any) => {
    const {input, meta: {touched, error}, child, placeholder, type, variant, ...restProps} = props
    return (
       <FormControl {...props}>
           {/*<textarea {...input} {...restProps}/>*/}
           <TextField {...input}
                      style={{marginBottom: '10px'}}
                      error={touched && error}
                      helperText={touched && error}
                      fullWidth
                      label={placeholder}
                      type={type}
                      variant={variant ? variant : 'outlined'}
                      size='small'/>
       </FormControl>
    )
}

export const Input = (props: any) => {
    const {input, meta, child, ...restProps} = props
    return (
        <FormControl {...props}>
            <input {...input} {...restProps}/>
        </FormControl>
    )
}

export const createField = (placeholder:any, name: any, component: any, validate: any) => {
    return (
    <div>
        <Field placeholder={placeholder} name={name} component={component} validate={validate}/>
    </div>
    )
}