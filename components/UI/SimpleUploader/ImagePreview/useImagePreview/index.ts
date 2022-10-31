import {useCallback, useState, MouseEventHandler} from 'react'


type Options = {
    fileName: string
    fileSize: number
    deleteImage: () => void
}

type Returned = {
    deleteClick: MouseEventHandler
    fileSizeBytesLabel: string
    fileSizeBytes: string
    cutFileName: string
    isRemoving: boolean
}

export default function useImagePreview(options: Options): Returned {

    const {
        fileName,
        fileSize,
        deleteImage
    } = options

    const [isRemoving, setIsRemoving] = useState<boolean>(false)

    const deleteClick: MouseEventHandler = useCallback((): void => {
        setIsRemoving(true)
        setTimeout(() => {
            deleteImage()
        }, 200)
    }, [])

    const cutFileName = fileName.length > 7 ? fileName.slice(0, 7) + '...' : fileName
    const fileSizeBytes = Math.ceil(fileSize / 1024).toString()
    const fileSizeBytesLabel = fileSizeBytes.length > 3 ? fileSizeBytes.slice(0, 3) + '...' : fileSizeBytes

    return {
        deleteClick,
        fileSizeBytesLabel,
        fileSizeBytes,
        cutFileName,
        isRemoving
    }
}
