import {
    Dispatch,
    RefObject,
    SetStateAction,
    useCallback,
    useEffect,
    useState
} from 'react'
import useElementDimensions from '@hooks/useElementDimensions'


const elementSizes = {
    dividerWidth: 0.006,
    rollerSize: 0.064
}

type Returned = {
    x: number
    root: RefObject<HTMLDivElement>
    dividerWidth: number | null
    rollerSize: number | null
    width: number | null
    rollerActive: boolean
    setX: Dispatch<SetStateAction<number>>
    downHandler: () => void
    upHandler: () => void
    initialX: number
}

export default function useImageComparator(): Returned {

    const {
        element: root,
        width,
        offsetX
    } = useElementDimensions<HTMLDivElement>()

    const [dividerWidth, setDividerWidth] = useState<number | null>(null)
    const [rollerSize, setRollerSize] = useState<number | null>(null)
    const [rollerActive, setRollerActive] = useState<boolean>(false)

    const initialX = 50

    const [x, setX] = useState<number>(0)

    const downHandler = useCallback((): void => {
        setRollerActive(true)
    }, [setRollerActive])

    const upHandler = useCallback((): void => {
        setRollerActive(false)
    }, [setRollerActive])

    useEffect(() => {
        if (width) {
            const targetDividerWidth = width * elementSizes.dividerWidth
            const targetRollerWidth = width * elementSizes.rollerSize
            setDividerWidth(targetDividerWidth < 2 ? 2 : targetDividerWidth)
            setRollerSize(targetRollerWidth < 30 ? 30 : targetRollerWidth)
        }
    }, [width])

    return {
        x,
        root,
        dividerWidth,
        rollerSize,
        width,
        rollerActive,
        setX,
        initialX,
        downHandler,
        upHandler
    }
}
