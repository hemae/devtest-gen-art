import {useEffect, useState} from 'react'
import {FileType} from '@UI/Uploader/useUploader'

export type ImageFile = {
    content: ArrayBuffer | string | null
    fileName: string
    fileSize: number
}

type Options = {
    files: FileType[]
}

type Returned = {
    image: ImageFile | null
    setImage: (image: ImageFile | null) => void
}

export default function useImage(options: Options): Returned {

    const {files} = options

    const [image, setImage] = useState<ImageFile | null>(null)

    useEffect(() => {
        if (!!files?.length) {
            setImage(null)
            const reader = new FileReader()
            reader.onload = event => {
                setImage({
                    content: event.target!.result,
                    fileName: files[0].file.name,
                    fileSize: files[0].file.size
                })
            }
            reader.readAsDataURL(files[0].file)
        } else {
            setImage(null)
        }
    }, [files])

    return {
        image, setImage
    }
}
