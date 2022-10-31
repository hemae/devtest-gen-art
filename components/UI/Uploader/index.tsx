import {ChangeEvent, FC, useState} from 'react'
import styles from './Uploader.module.scss'
import {useDropzone, DropzoneOptions} from 'react-dropzone'
import {ImageEditor} from './ImageEditor'
import useUploader from './useUploader'
import useImage from './useImage'
import {DropZone} from './DropZone'
import classNames from 'classnames'



export const Uploader: FC = () => {

    const {files, onDrop, onDeleteFiles} = useUploader()
    const {image} = useImage({files})

    const [imageLink, setImageLink] = useState<string | null>(null)
    const [link, setLink] = useState<any>(null)

    const onLinkChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLink(event.target.value)
    }

    const onSubmitLinkClick = (): void => {
        setImageLink(link)
    }

    return (
        <div className={classNames(
            styles.main,
            {[styles.isImage]: !!image || !!imageLink}
        )}>
            <ImageEditor
                image={image}
                link={imageLink}
            />
            <DropZone
                {...useDropzone({onDrop} as DropzoneOptions)}
            />
            <input
                value={link}
                onChange={onLinkChange}
                type='text'
            />
            <button
                onClick={onSubmitLinkClick}
            >Upload</button>
        </div>
    )
}
