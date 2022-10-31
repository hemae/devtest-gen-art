import {Html, Head, Main, NextScript, DocumentProps} from 'next/document'
import {FC} from 'react'


const Document: FC<DocumentProps> = () => {
    return (
        <Html>
            <Head>
                <link rel='icon' href='/favicon.ico'/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}

export default Document
