import {memo} from 'react'
import styles from './Date.module.scss'
import useDate from '@components/UI/Date/useDate'


type DateProps = { date: string, withTime?: boolean }

export const DateComponent = memo<DateProps>((props) => {

    const {
        date,
        withTime = false
    } = props

    const {parsedDate} = useDate({date, withTime})

    return <span className={styles.main}>{parsedDate}</span>
})
