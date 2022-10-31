import {ChangeEvent, FormEventHandler, memo, useCallback, useState} from 'react'


type LinkFormProps = {
    submitHandler: (value: string) => void
}

export const LinkForm = memo<LinkFormProps>((props) => {

    const {
        submitHandler
    } = props

    const [link, setlLink] = useState<string>('')

    const onLinkChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setlLink(event.target.value)
    }

    const onFormSubmit: FormEventHandler<HTMLFormElement> = useCallback((event): void => {
        event.preventDefault()
        submitHandler(link)
    }, [submitHandler])

    return (
        <form
            onSubmit={onFormSubmit}
        >
            <input
                onChange={onLinkChange}
                value={link}
            />
            <button
                type='submit'
            >Download</button>
        </form>
    )
})
