import {ChildComponent, ContentComponent} from '@admin/types'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {useAppDispatch} from '@store'
import {getLayout} from '@slices/layouts/layoutsThunkCreators'


type Returned = {
    contentComponent: ContentComponent
    childComponent: ChildComponent
}

export default function useContentComponent(): Returned {

    const router = useRouter()

    const contentComponent = router.query.contentComponent as ContentComponent
    const childComponent = router.query.childComponent as ChildComponent

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getLayout({target: 'acceptLanguages'}))
    }, [])

    return {contentComponent, childComponent}
}
