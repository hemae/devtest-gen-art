import {useAppSelector} from '@store'
import boolAdder from '@helpers/boolAdder'


export default function useAppLoading(): { isAppLoading: boolean } {

    //

    return {
        isAppLoading: boolAdder()
    }
}

