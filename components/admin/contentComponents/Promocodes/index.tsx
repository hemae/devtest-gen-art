import {FC} from 'react'
import usePromocodes from '@admin/contentComponents/Promocodes/usePromocodes'
import {PromocodeForm} from '@admin'


export const Promocodes: FC = () => {

    const {promocodes} = usePromocodes()

    return (
        <>
            {promocodes.map(promocode => {
                return (
                    <PromocodeForm
                        key={promocode.id}
                        promocode={promocode}
                    />
                )
            })}
            <PromocodeForm
                key='new-promocode'
            />
        </>
    )
}
