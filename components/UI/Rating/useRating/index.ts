import {UniqueNum} from '@apiModels/common'
import {useEffect, useState, MouseEventHandler, useCallback} from 'react'

export type RatingItem = {
    id: UniqueNum
    fill: boolean
}


type Options = {
    rating: number
    maxRating: number
    interactive: boolean
    setRating: (rate: UniqueNum) => void
}

type Returned = {
    ratingItems: RatingItem[]
    itemOver: (index: UniqueNum) => MouseEventHandler
    itemLeave: MouseEventHandler
    itemClick: (index: UniqueNum) => MouseEventHandler
}

export default function useRating(options: Options): Returned {

    const {
        rating,
        maxRating,
        interactive,
        setRating
    } = options

    const [ratingItems, setRatingItems] = useState<RatingItem[]>([])
    const [currentIndex, setCurrentIndex] = useState<UniqueNum | null>(null)

    const itemOver = (index: UniqueNum): MouseEventHandler => () => {
        if (interactive) {
            setCurrentIndex(index)
        }
    }

    const itemLeave: MouseEventHandler = useCallback(() => {
        if (interactive) {
            setCurrentIndex(null)
        }
    }, [interactive, setCurrentIndex])

    useEffect(() => {
        const newRatingItems: RatingItem[] = []
        for (let i = 1; i <= maxRating; i++) newRatingItems.push({id: i, fill: i <= (currentIndex || rating)})
        setRatingItems(newRatingItems)
    }, [rating, maxRating, currentIndex])

    const itemClick = (index: UniqueNum): MouseEventHandler => () => {
        if (interactive) setRating(index)
    }

    return {
        ratingItems,
        itemOver,
        itemLeave,
        itemClick
    }
}
