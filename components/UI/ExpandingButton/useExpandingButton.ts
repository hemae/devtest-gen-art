import {MouseEventHandler, useCallback, useEffect, useState} from 'react'


type Options<ItemType> = {
    items: ItemType[]
    pageSize: number
}

type Returned<ItemType> = {
    expandingButtonClick: MouseEventHandler
    expandingButtonHidden: boolean
    visibleItems: ItemType[]
}

export function useExpandingButton<ItemType = any>(options: Options<ItemType>): Returned<ItemType> {

    const {
        items,
        pageSize
    } = options

    const [pageCount, setPageCount] = useState<number>(0)
    const [expandingButtonHidden, setExpandingButtonHidden] = useState<boolean>(true)
    const [visibleItems, setVisibleItems] = useState<ItemType[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
        setPageCount(Math.ceil(items.length / pageSize))
    }, [items, pageSize, setPageCount])

    useEffect(() => {
        if (currentPage < pageCount) setExpandingButtonHidden(false)
        else setExpandingButtonHidden(true)
    }, [currentPage, pageCount, setExpandingButtonHidden])

    useEffect(() => {
        setVisibleItems(items.slice(0, currentPage * pageSize))
    }, [currentPage, pageSize, setVisibleItems])

    const expandingButtonClick: MouseEventHandler = useCallback((): void => {
        setCurrentPage(prev => prev + 1)
    }, [setCurrentPage])

    return {
        expandingButtonHidden,
        expandingButtonClick,
        visibleItems
    }
}
