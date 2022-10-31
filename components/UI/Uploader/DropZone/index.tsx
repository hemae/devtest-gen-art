import {memo} from 'react'
import styles from './DropZone.module.scss'
import classNames from 'classnames'
import * as BsIcons from 'react-icons/bs'
import {DropzoneRootProps, DropzoneInputProps} from 'react-dropzone'


type DropZoneProps = {
    getRootProps: <T extends DropzoneRootProps>(props?: (T | undefined)) => T
    isDragActive: boolean
    getInputProps:  <T extends DropzoneInputProps>(props?: (T | undefined)) => T
}

export const DropZone = memo<DropZoneProps>((props) => {

    const {
        getRootProps,
        isDragActive,
        getInputProps
    } = props

    return (
        <div
            {...getRootProps()}
            className={classNames(
                styles.main,
                {[styles.active]: isDragActive}
            )}
        >
            <BsIcons.BsFillCapslockFill/>
            <span
                className={classNames(
                    styles.desktop
                )}
            >Put image or click to upload</span>
            <span
                className={classNames(
                    styles.tablet
                )}
            >Tap to upload</span>

            <input {...getInputProps()}/>
        </div>
    )
})
