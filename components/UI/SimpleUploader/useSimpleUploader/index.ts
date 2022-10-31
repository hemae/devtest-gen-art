import {useCallback, useEffect, useState, MouseEventHandler, useRef, RefObject, ChangeEventHandler} from 'react'
import {useAppDispatch, useAppSelector} from '@store'
import {uploadImages} from '@slices/upload/uploadThunkCreators'


export type ImageFileType = {
    id: number
    content: ArrayBuffer | string | null
    fileName: string
    fileSize: number
}


type Options = {
    isRussian?: boolean
    chunkName: string
    target: string
}

type Returned = {
    addClick: MouseEventHandler
    images: Array<ImageFileType>
    uploaderInput: RefObject<HTMLInputElement>
    uploaderInputChange: ChangeEventHandler<HTMLInputElement>
}

export default function useSimpleUploader(options: Options): Returned {

    const {
        isRussian = false,
        chunkName,
        target
    } = options

    const uploaderInput = useRef<HTMLInputElement>(null)
    const [files, setFiles] = useState<Array<File>>([])
    const [images, setImages] = useState<Array<ImageFileType>>([])
    const {notice} = useAppSelector(state => state.uploadReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (notice === 'Successfully uploaded') {
            setImages([])
            setFiles([])
        }
    }, [notice])

    useEffect(() => {
        if (files.length) {
            dispatch(uploadImages({
                isRussian,
                data: {files},
                chunkName,
                target
            }))
        }
    }, [files.length])

    const addClick: MouseEventHandler = useCallback((): void => {
        if (uploaderInput?.current) uploaderInput.current.click()
    }, [uploaderInput?.current])

    const uploaderInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((event): void => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files))
        }
    }, [setFiles])

    return {
        addClick,
        images,
        uploaderInput,
        uploaderInputChange
    }
}
