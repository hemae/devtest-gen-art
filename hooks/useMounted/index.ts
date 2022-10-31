import {useEffect, useState} from 'react'


type Returned = boolean

export default function useMounted(): Returned {

    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return mounted
}
