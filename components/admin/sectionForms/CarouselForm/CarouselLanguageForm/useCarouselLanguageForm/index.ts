import {useCallback, useState, ChangeEventHandler, MouseEventHandler, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '@store'
import {clearCurrentImageLinks} from '@slices/upload'
import {deleteImages} from '@slices/upload/uploadThunkCreators'
import {AdminSectionData, Section} from '@apiModels/sections'
import {Carousel} from '@apiModels/sections/carousel'
import {addSection, updateSection} from '@slices/sections/sectionsThunkCreators'
import {carouselInitialData} from '@adminData/sections/initialData/carousel'


type Options = {
    locale: string
    initialData?: Section<AdminSectionData<Carousel>>
}

type Returned = {
    title: string
    headerLinkTitle: string
    backgroundImage: string | null
    shadowDirection: string
    shadowDirectionMobile: string
    inputChange: (fieldName: 'title' | 'headerLinkTitle' | 'shadowDirection' | 'shadowDirectionMobile') => ChangeEventHandler<HTMLInputElement>
    uploaderShown: boolean
    uploaderClick: MouseEventHandler
    deleteImage: (imageSrc: string) => void
    submit: MouseEventHandler
    disabled: boolean
}

export default function useCarouselLanguageForm(options: Options): Returned {

    const {
        locale,
        initialData
    } = options

    const [title, setTitle] = useState<string>(initialData?.data[locale] ? initialData?.data[locale].title || '' : '')
    const [headerLinkTitle, setHeaderLinkTitle] = useState<string>(initialData?.data[locale] ? initialData?.data[locale].headerLinkTitle || '' : '')
    const [shadowDirection, setShadowDirection] = useState<string>(initialData?.data[locale] ? (initialData?.data[locale].data.shadowDirection ?? '').toString() : '')
    const [shadowDirectionMobile, setShadowDirectionMobile] = useState<string>(initialData?.data[locale] ? (initialData?.data[locale].data.shadowDirectionMobile ?? '').toString() : '')
    const [backgroundImage, setBackgroundImage] = useState<string | null>(initialData?.data[locale] ? initialData?.data[locale].data.backgroundImage : null)

    const {target, currentImageLinks} = useAppSelector(state => state.uploadReducer)
    const {acceptLanguages} = useAppSelector(state => state.layoutsReducer)

    const dispatch = useAppDispatch()

    const disabled = !acceptLanguages?.find(language => language.data.locale === locale)!.enabled

    const deleteImage = (imageSrc: string): void => {
        setBackgroundImage(null)
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
        if (target === `carousel-section-${locale}-${initialData ? initialData.id : 'new'}` && currentImageLinks?.length) {
            setBackgroundImage(currentImageLinks[0])
            dispatch(clearCurrentImageLinks())
        }
    }, [currentImageLinks?.length, target, initialData])

    const [uploaderShown, setUploaderShown] = useState<boolean>(false)

    const inputChange = (fieldName: 'title' | 'headerLinkTitle' | 'shadowDirection' | 'shadowDirectionMobile'): ChangeEventHandler<HTMLInputElement> => (event) => {
        if (fieldName === 'title') setTitle(event.target.value)
        else if (fieldName === 'headerLinkTitle') setHeaderLinkTitle(event.target.value)
        else if (fieldName === 'shadowDirection') setHeaderLinkTitle(event.target.value)
        else if (fieldName === 'shadowDirectionMobile') setHeaderLinkTitle(event.target.value)
    }

    const submit: MouseEventHandler = useCallback((event): void => {
        event.preventDefault()
        event.stopPropagation()
        if (initialData) {
            dispatch(updateSection({
                id: initialData.id,
                data: {
                    data: {
                        data: {
                            ...initialData.data,
                            [locale]: {
                                title: title || null,
                                headerLinkTitle: headerLinkTitle || null,
                                data: {
                                    backgroundImage,
                                    shadowDirection: shadowDirection === '' ? null : shadowDirection,
                                    shadowDirectionMobile:  shadowDirectionMobile === '' ? null : shadowDirection,
                                    tabs: []
                                }
                            }
                        }
                    }
                }
            }))
        } else {
            if (acceptLanguages) {
                let data = {}
                acceptLanguages
                    .map(language => language.data.locale)
                    .forEach(locale => {
                        //@ts-ignore
                        data[locale] = carouselInitialData
                    })
                dispatch(addSection({
                    data: {
                        data: {
                            data: {
                                ...data,
                                [locale]: {
                                    title,
                                    headerLinkTitle,
                                    data: {
                                        backgroundImage,
                                    }
                                }
                            }
                        }
                    }
                }))
                setTitle('')
                setHeaderLinkTitle('')
                setShadowDirection('')
                setShadowDirectionMobile('')
                setBackgroundImage(null)
            }
        }
    }, [title, headerLinkTitle, backgroundImage, shadowDirection, shadowDirectionMobile])

    const uploaderClick: MouseEventHandler = useCallback((): void => {
        setUploaderShown(prev => !prev)
    }, [setUploaderShown])

    return {
        title,
        headerLinkTitle,
        backgroundImage,
        shadowDirection,
        shadowDirectionMobile,
        inputChange,
        uploaderShown,
        uploaderClick,
        deleteImage,
        submit,
        disabled
    }
}
