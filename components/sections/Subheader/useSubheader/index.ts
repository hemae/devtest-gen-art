import useMounted from '@hooks/useMounted'
import {useEffect, useState} from 'react'


type Returned = {
    mounted: boolean
    textShown: boolean
}

export default function useSubheader(): Returned {

    const mounted = useMounted()

    const [textShown, setTextShown] = useState<boolean>(false)

    useEffect(() => {
        if (mounted) setTimeout(() => setTextShown(true), 300)
    }, [mounted])

    return {
        mounted,
        textShown
    }
}
