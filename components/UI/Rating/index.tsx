import {memo} from 'react'
import styles from './Rating.module.scss'
import Star from '../../../assets/icons/star.svg'
import classNames from 'classnames'
import useRating from '@components/UI/Rating/useRating'
import {UniqueNum} from '@apiModels/common'


type RatingProps = {
    rating: number
    maxRating: number
    interactive?: boolean
    setRating?: (rate: UniqueNum) => void
}

export const Rating = memo<RatingProps>((props) => {

    const {
        rating,
        maxRating,
        interactive = false,
        setRating
    } = props

    const {
        ratingItems,
        itemOver,
        itemLeave,
        itemClick
    } = useRating({rating, maxRating, interactive, setRating: setRating!})

    return (
        <div className={styles.main}>
            {ratingItems.map(ratingItem => {
                return (
                    <div
                        key={ratingItem.id}
                        className={classNames(
                            {[styles.fill]: ratingItem.fill},
                            {[styles.interactive]: interactive},
                        )}
                        onMouseOver={itemOver(ratingItem.id)}
                        onMouseLeave={itemLeave}
                        onClick={itemClick(ratingItem.id)}
                    ><Star/></div>
                )
            })}
        </div>
    )
})
