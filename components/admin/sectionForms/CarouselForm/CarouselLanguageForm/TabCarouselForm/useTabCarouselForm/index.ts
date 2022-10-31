import {CarouselTab} from '@apiModels/sections/carousel'
import {MouseEventHandler, useCallback, useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from '@store'
import {deleteImages} from '@slices/upload/uploadThunkCreators'
import {clearCurrentImageLinks} from '@slices/upload'


type Options = {
    locale: string
    tab?: CarouselTab
}

type Returned = {
    deleteImage: (kind: 'background' | 'image') => (imageSrc: string) => void
    uploaderClick: (kind: 'background' | 'image') => MouseEventHandler
    backgroundImage: string | null
    image: string | null
    backgroundUploaderShown: boolean
    imageUploaderShown: boolean
}

export default function useTabCarouselForm(options: Options): Returned {

    const {
        locale,
        tab
    } = options

    const [backgroundImage, setBackgroundImage] = useState<string | null>(tab ? tab.backgroundImage : null)
    const [image, setImage] = useState<string | null>(tab ? tab.image : null)
    const [backgroundUploaderShown, setBackgroundUploaderShown] = useState<boolean>(false)
    const [imageUploaderShown, setImageUploaderShown] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const {target, currentImageLinks} = useAppSelector(state => state.uploadReducer)

    const deleteImage = (kind: 'background' | 'image') => (imageSrc: string): void => {
        if (kind === 'background') setBackgroundImage(null)
        else setImage(null)
        dispatch(deleteImages({
            chunkName: 'carousel-section-images',
            data: {
                data: {
                    imageLinks: [imageSrc]
                }
            }
        }))
    }

    useEffect(() => {
        if (currentImageLinks?.length) {
            if (target === `carousel-tab-background-${locale}-${tab ? tab.id : 'new'}`) {
                setBackgroundImage(currentImageLinks[0])
            } else if (target === `carousel-tab-image-${locale}-${tab ? tab.id : 'new'}`) {
                setImage(currentImageLinks[0])
            }
            dispatch(clearCurrentImageLinks())
        }
    }, [currentImageLinks?.length, target, tab])

    const uploaderClick = (kind: 'background' | 'image'): MouseEventHandler => (): void => {
        if (kind === 'background') setBackgroundUploaderShown(prev => !prev)
        else if (kind === 'image') setImageUploaderShown(prev => !prev)
    }

    return {
        deleteImage,
        uploaderClick,
        backgroundImage,
        image,
        backgroundUploaderShown,
        imageUploaderShown
    }
}
