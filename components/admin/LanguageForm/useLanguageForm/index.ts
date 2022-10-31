import {ChangeEventHandler, MouseEventHandler, useCallback, useEffect, useState} from 'react'
import {Language} from '@apiModels/layouts/acceptLanguages'
import {useAppDispatch} from '@store'
import {putLayout} from '@slices/layouts/layoutsThunkCreators'
import generateId from 'hans-id'


type Options = {
    language?: Language
    acceptLanguages: Language[] | null
}

type Returned = {
    locale: string
    title: string
    order: string
    inputChange: (fieldName: 'locale' | 'title' | 'order') => ChangeEventHandler<HTMLInputElement>
    checkboxChange: (fieldName: 'enabled') => MouseEventHandler
    deleteClick: MouseEventHandler
    submit: MouseEventHandler
    isSubmitButtonDisable: boolean
    enabled: boolean
}

export default function useLanguageForm(options: Options): Returned {

    const {
        language,
        acceptLanguages
    } = options

    const [locale, setLocale] = useState<any>(language?.data.locale || '')
    const [title, setTitle] = useState<string>(language?.data.title || '')
    const [order, setOrder] = useState<string>(language?.order?.toString() || '')
    const [enabled, setEnabled] = useState<boolean>(language ? language.enabled : false)

    const [isSubmitButtonDisable, setIsSubmitButtonDisable] = useState<boolean>(false)

    useEffect(() => {
        if (!!locale && !!title && order !== '') {
            setIsSubmitButtonDisable(false)
        } else {
            setIsSubmitButtonDisable(true)
        }
    }, [locale, title, order])

    const dispatch = useAppDispatch()

    const inputChange = (fieldName: 'locale' | 'title' | 'order'): ChangeEventHandler<HTMLInputElement> => (event) => {
        if (fieldName === 'locale') setLocale(event.target.value)
        else if (fieldName === 'title') setTitle(event.target.value)
        else if (fieldName === 'order') setOrder(event.target.value)
    }

    const checkboxChange = (fieldName: 'enabled'): MouseEventHandler => () => {
        if (fieldName === 'enabled') setEnabled(prev => !prev)
    }

    const deleteClick: MouseEventHandler = useCallback((): void => {
        if (language && acceptLanguages) {
            dispatch(putLayout({
                target: 'acceptLanguages',
                data: {data: {data: acceptLanguages.filter(_language => _language.id !== language.id)}}
            }))
        }
    }, [language, acceptLanguages, acceptLanguages?.length])

    const submit: MouseEventHandler = useCallback((event): void => {
        event.preventDefault()
        if (language && acceptLanguages) {
            dispatch(putLayout({
                target: 'acceptLanguages',
                data: {
                    data: {
                        data: acceptLanguages
                            .map(
                                _language => _language.id === language.id
                                    ? {
                                        id: language.id,
                                        order: +order,
                                        enabled,
                                        data: {
                                            locale,
                                            title,
                                        }
                                    } : _language
                            )
                    }
                }
            }))
        } else if (acceptLanguages) {
            dispatch(putLayout({
                target: 'acceptLanguages',
                data: {
                    data: {
                        data: [...acceptLanguages, {
                            id: generateId(),
                            order: +order,
                            enabled,
                            data: {
                                locale,
                                title,
                            }
                        }]
                    }
                }
            }))
            setLocale('')
            setTitle('')
            setOrder('')
            setEnabled(false)
        }
    }, [language, locale, title, order, enabled, acceptLanguages, acceptLanguages?.length])

    return {
        locale,
        title,
        order,
        inputChange,
        checkboxChange,
        deleteClick,
        submit,
        isSubmitButtonDisable,
        enabled
    }
}
