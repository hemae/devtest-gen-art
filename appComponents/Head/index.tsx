import {memo, useEffect} from 'react'
import Head from 'next/head'
import {Script} from '@apiModels/layouts/scripts'
import smoothscroll from 'smoothscroll-polyfill'


type HeadProps = {
    title: string
    description: string
    imagePreview?: string | null
    scripts: Script[] | null | undefined
}

export const HeadComponent = memo<HeadProps>((props) => {

    const {
        title,
        description,
        imagePreview,
        scripts
    } = props

    useEffect(() => {
        try {
            //@ts-ignore
            window.__forceSmoothScrollPolyfill__ = true
            smoothscroll.polyfill()
        } catch (e) {
        }
    }, [])

    return (
        <Head>
            <title>{title}</title>
            <meta name='viewport' content='width=device-width, initial-scale=1'/>
            <meta httpEquiv='Content-Type' content='text/html; charset=UTF-8'/>
            <meta name='theme-color' content='#ffffff'/>
            <meta name='description' content={description}/>
            {imagePreview &&
            <meta
                property="og:image"
                content={imagePreview}
            />}
            {process.env.NODE_ENV !== 'development'
            && !!scripts
            && scripts.filter(script => !!script.script)
                .map(script => {
                return (
                    <script
                        key={script.id}
                        dangerouslySetInnerHTML={{__html: script.script || ''}}
                    />
                )
            })}
            {!!scripts
            && scripts.filter(script => !!script.src)
                .map(script => {
                    return (
                        <script
                            key={script.id}
                            src={script.src || ''}
                        />
                    )
                })}
            <script dangerouslySetInnerHTML={{
                __html: `
                    console.log('do script')
                    var ourWidjet = new ISDEKWidjet ({
                        defaultCity: 'Москва',
                        cityFrom: 'Екатеринбург',
                        country: 'Россия',
                        link: 'forpvz',
                        path: 'https://widget.cdek.ru/widget/scripts/',
                        servicepath: '/sdek/scripts/service.php'
                    });
                `
            }}/>
        </Head>
    )
})
