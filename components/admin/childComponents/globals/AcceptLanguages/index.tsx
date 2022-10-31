import {FC} from 'react'
import useAcceptLanguages from '@admin/childComponents/globals/AcceptLanguages/useAcceptLanguages'
import {LanguageForm} from '@admin'


export const AcceptLanguages: FC = () => {

    const {acceptLanguages} = useAcceptLanguages()

    return (
        <>
            {acceptLanguages?.map(language => {
                return (
                    <LanguageForm
                        key={language.id}
                        language={language}
                        acceptLanguages={acceptLanguages}
                    />
                )
            })}
            <LanguageForm
                key={'new'}
                acceptLanguages={acceptLanguages}
            />
        </>
    )
}
