import {FC, memo} from 'react'
import styles from './Alert.module.scss'
import classNames from 'classnames'
import useAlert from './useAlert'
import {Alert as AlertType} from '@slices/alert/models'
import useAdditionalAttributes from '@hooks/useAdditionalAttributes'
import {useAppSelector} from '@store'


type AlertProps = {
    alert: AlertType
}

export const Alert = memo<AlertProps>(({alert}) => {

    const {
        active,
        hidden,
        alertMessage
    } = useAlert({alert})

    const {root} = useAdditionalAttributes({
        'data-id': `alert-${alert.type}-${alert.id}`
    })

    return (
        <aside
            ref={root}
            className={classNames(
                styles.main,
                {[styles.active]: active},
                {[styles.hidden]: hidden},
                {[styles.error]: alert.type === 'error'}
            )}>{alertMessage}</aside>
    )
})

export const Alerts: FC = () => {

    const {alerts} = useAppSelector(state => state.alertReducer)

    return (
        <>
            {!!alerts.length
                ? alerts.map(alert => {
                    return (
                        <Alert
                            key={alert.id}
                            alert={alert}
                        />
                    )
                })
                : <></>}
        </>
    )
}
