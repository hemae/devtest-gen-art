import {FC} from 'react'
import {PromoPictureForm} from '@admin'
import usePromoPictures from '@admin/contentComponents/PromoPictures/usePromoPictures'


export const PromoPictures: FC = () => {

    const {promoPictures} = usePromoPictures()

    return (
        <>
            {promoPictures.map(promoPicture => {
                return (
                    <PromoPictureForm
                        key={promoPicture.id}
                        promoPicture={promoPicture}
                    />
                )
            })}
            <PromoPictureForm
                key='new-promo-picture'
            />
        </>
    )
}
