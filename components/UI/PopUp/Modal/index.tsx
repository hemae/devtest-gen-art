import {HTMLAttributes, memo} from 'react'
import styles from './Modal.module.scss'


export default memo<HTMLAttributes<HTMLDivElement>>(
    (props) => <section className={styles.modal} {...props}/>
)
