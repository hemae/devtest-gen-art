import {memo, MouseEventHandler, useCallback} from 'react'
import styles from './ImagesPreview.module.scss'


type ImagesPreviewProps = {
    images: string[]
    deleteImage: (imageLink: string) => void
}

export const ImagesPreview = memo<ImagesPreviewProps>((props) => {

    const {
        images,
        deleteImage
    } = props

    const deleteImageClick = (imageLink: string): MouseEventHandler => (): void => {
        deleteImage(imageLink)
    }

    return (
        <div className={styles.main}>
            {images.map(imageSrc => {
                return (
                    <div
                        key={imageSrc}
                    >
                        <button
                            id='delete-image'
                            onClick={deleteImageClick(imageSrc)}
                        >&times;</button>
                        <img src={imageSrc} alt='uploaded-image'/>
                    </div>
                )
            })}
        </div>
    )
})
