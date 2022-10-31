import {memo} from 'react'
import styles from './Content.module.scss'
import contentsComponents from '@components/admin/contentComponents'
import {ChildComponent, ContentComponent} from '@admin/types'
import transformPathIntoPhrase from '@helpers/transformPathIntoPhrase'


type ContentProps = {
    contentComponent: ContentComponent | ChildComponent
}

export const Content = memo<ContentProps>((props) => {

    const {
        contentComponent
    } = props

    const TargetComponent = contentsComponents[contentComponent]

    if (!TargetComponent) return <></>

    return (
        <section
            className={styles.main}
        >
            <h1>{transformPathIntoPhrase(contentComponent)}</h1>
            <TargetComponent/>
        </section>
    )
})
