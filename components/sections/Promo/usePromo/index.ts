import useElementDimensions from '@hooks/useElementDimensions'
import {RefObject} from 'react'


type Returned = {
    wrapper: RefObject<HTMLDivElement>
    offsetX: number | null
}

export default function usePromo(): Returned {

    const {
        element: wrapper,
        offsetX
    } = useElementDimensions<HTMLDivElement>()

    return {
        wrapper,
        offsetX
    }
}
