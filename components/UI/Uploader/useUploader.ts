import {useCallback, useState} from 'react'
import {DropEvent, FileError, FileRejection} from 'react-dropzone'


export type FileType = {
    file: File,
    errors: Array<FileError>
}

const acceptedExtensions = ['jpeg', 'jpg', 'png', 'bmp', 'gif', 'svg', 'ico']

type Returned = {
    files: Array<FileType>
    setFiles: (files: Array<FileType>) => void
    onDrop: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void
    onDeleteFiles: () => void
}

export default function(): Returned {

    const [files, setFiles] = useState<Array<FileType>>([])

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const mappedAccepted = acceptedFiles.map(file => ({file, errors: []}))
        setFiles(prev => [
            ...mappedAccepted
                .filter(file => !~prev.map(file => file.file.name).indexOf(file.file.name))
                .filter(file => !!~acceptedExtensions.indexOf(file.file.name.split('.').pop() || ''))
        ])
    }, [])

    const onDeleteFiles = useCallback((): void => {
        setFiles([])
    }, [setFiles])

    return {
        files, setFiles, onDrop, onDeleteFiles
    }
}
