import {memo} from 'react'
import styles from './SDEK.module.scss'


type SDEKProps = {
    prop: any
}

export const SDEK = memo<SDEKProps>((props) => {

    const {
        prop
    } = props

    return (
        <div
            id='sdek'
            className={styles.main}
        >
        </div>
    )
})
