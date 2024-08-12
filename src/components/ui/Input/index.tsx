import styles from './styles.module.scss'

import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>;
type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Input({...rest}: InputProps){
    return(
        <input className={styles.input} type="text" {...rest} />
    )
}

export function TextArea({...rest}: TextAreaProps){
    return(
        <textarea className={styles.input} {...rest} ></textarea>
    )
}