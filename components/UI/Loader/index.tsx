import {memo} from 'react'
import styles from './Loader.module.scss'


type LoaderProps = {
    size?: number
}

export const Loader = memo<LoaderProps>((props) => {

    const {size = 56} = props
    const scale = size / 56

    return (
        <div
            className={styles.main}
            style={{transform: `scale(${scale})`}}
        >
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
})
