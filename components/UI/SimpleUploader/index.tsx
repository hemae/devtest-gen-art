import {memo} from 'react'
import styles from './SimpleUploader.module.scss'
import {ImagePreview} from './ImagePreview'
import classNames from 'classnames'
import useSimpleUploader from '@components/UI/SimpleUploader/useSimpleUploader'
import {Loader} from '@UI'


type UploaderProps = {
    isRussian?: boolean
    single?: boolean
    target: string
    chunkName: string
}

export const SimpleUploader = memo<UploaderProps>((props) => {

    const {
        isRussian = false,
        single = false,
        target,
        chunkName
    } = props

    const {
        addClick,
        images,
        uploaderInput,
        uploaderInputChange,
    } = useSimpleUploader({chunkName, target, isRussian})

    return (
        <section className={styles.main}>
            <div className={styles.main__buttonsContainer}>
                <input
                    id='uploader-input'
                    ref={uploaderInput}
                    onChange={uploaderInputChange}
                    type='file'
                    accept='image/*'
                    multiple={!single}
                />
                <div
                    className={styles.main__button}
                    onClick={addClick}
                ><img src='/uploader.png'/></div>
            </div>
        </section>
    )
})
