import {Dispatch, memo, MouseEventHandler, SetStateAction, useCallback} from 'react'
import styles from './TabSwitcher.module.scss'
import classNames from 'classnames'
import {UniqueNum} from '@apiModels/common'


const TabItem = memo<{
    active: boolean
    setCurrentTab: () => void
}>( ({active, setCurrentTab}) => {
    return (
        <div
            className={classNames(
                styles.main__switchItem,
                {[styles.active]: active}
            )}
            onClick={setCurrentTab}
        />
    )
})

const TabSwitch = memo<{
    direction: -1 | 1
    handler: () => void
}>( ({handler, direction}) => {
    return (
        <div
            className={classNames(
                styles.main__switcher,
                {[styles.left]: direction === -1},
                {[styles.right]: direction === 1}
            )}
            onClick={handler}
        />
    )
})

type TabSwitcherProps = {
    id?: string
    tabs: {order: UniqueNum}[]
    currentTab: UniqueNum
    setCurrentTab: Dispatch<SetStateAction<number>>
    prevHandler: () => void
    nextHandler: () => void
}

export const TabSwitcher = memo<TabSwitcherProps>((props) => {

    const {
        id,
        tabs,
        currentTab,
        setCurrentTab,
        prevHandler,
        nextHandler
    } = props

    return (
        <div
            id={id || 'tab-switcher'}
            className={classNames(
                styles.main,
                {[styles.none]: tabs.length === 1}
            )}>
            <TabSwitch key='1' direction={-1} handler={prevHandler}/>
            {tabs.map(tab => {
                return (
                    <TabItem
                        key={tab.order.toString()}
                        setCurrentTab={() => setCurrentTab(tab.order)}
                        active={currentTab === tab.order}
                    />
                )
            })}
            <TabSwitch key='2' direction={1} handler={nextHandler}/>
        </div>
    )
})

