import {MouseEventHandler, useCallback, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import appRoutes from '@appRoutes'
import router from 'next/router'


type Options = {
    sectionId: string | null | undefined
    scrollTo: string | null | undefined
}

type Returned = {
    linkClick: MouseEventHandler<HTMLSpanElement>
}

export default function useHeaderLink(options: Options): Returned {

    const {
        sectionId,
        scrollTo
    } = options

    const [targetSection, setTargetSection] = useState<HTMLDivElement | null>(null)

    const {pathname} = useRouter()

    useEffect(() => {
        if (sectionId) setTargetSection(document.getElementById(sectionId) as (HTMLDivElement | undefined) || null)
        if (scrollTo) setTargetSection(document.querySelector(scrollTo) as (HTMLDivElement | undefined) || null)
    }, [])

    const linkClick: MouseEventHandler<HTMLSpanElement> = useCallback((): void => {
        if (pathname === appRoutes.index) targetSection?.scrollIntoView({behavior: 'smooth'})
        else router.push(`${appRoutes.index}${sectionId ? `?targetSectionId=${sectionId}` : scrollTo ? `?targetSectionName=${scrollTo}` : ''}`)
    }, [targetSection, pathname, sectionId, scrollTo])

    return {
        linkClick
    }
}
