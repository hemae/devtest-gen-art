import {memo} from 'react'
import styles from './GradientBackground.module.scss'
import classNames from 'classnames'


type GradientBackgroundProps = {
    shadowDirection: number | null
    shadowColor: 'light' | 'dark'
    deviceType: 'desktop' | 'mobile'
}

export const GradientBackground = memo<GradientBackgroundProps>((props) => {

    const {
        shadowDirection,
        shadowColor,
        deviceType
    } = props

    if (!shadowDirection) return <></>

    return (
        <section
            className={classNames(styles.main, styles[deviceType])}
            style={{
                background: `linear-gradient(${shadowDirection}deg, rgba(${shadowColor === 'light' ? '255, 255, 255' : '0, 0, 0'}, 0.08) 0.06%, rgba(84, 84, 84, 0) 0.06%, #${shadowColor === 'light' ? 'ffffff' : '000000'} 99.94%)`
            }}
        />
    )
})
