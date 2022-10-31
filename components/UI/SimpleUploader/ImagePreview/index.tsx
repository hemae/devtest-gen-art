import {memo} from 'react'
import styles from './ImagePreview.module.scss'
import useImagePreview from './useImagePreview'
import classNames from 'classnames'


type ImagePreviewProps = {
    content: ArrayBuffer | string | null
    fileName: string
    fileSize: number
    deleteImage: () => void
}

export const ImagePreview = memo<ImagePreviewProps>((props) => {

    const {
        content,
        fileName,
        fileSize,
        deleteImage
    } = props

    const {
        deleteClick,
        fileSizeBytesLabel,
        fileSizeBytes,
        cutFileName,
        isRemoving
    } = useImagePreview({deleteImage, fileName, fileSize})

    return (
        <div
            className={classNames(
                styles.main,
                {[styles.isRemoving]: isRemoving}
            )}
        >
            <div
                className={classNames(styles.main__delete)}
                onClick={deleteClick}
            >&times;</div>
            <div
                className={classNames(styles.main__imageInfo)}
                title={`${fileName} ${fileSizeBytes}kB`}
            >
                <span>{cutFileName}</span>
                <span>{fileSizeBytesLabel}kB</span>
            </div>
            <img
                src={content as string}
                alt='image-preview'
            /></div>
    )
})
