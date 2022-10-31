import {useRouter} from 'next/router'
import {useEffect} from 'react'


export default function useMainPage(): void {

    const {query} = useRouter()

    const {targetSectionName, targetSectionId} = query as {targetSectionName?: string, targetSectionId?: string}

    useEffect(() => {
        if (targetSectionName) document.querySelector(targetSectionName)?.scrollIntoView({behavior: 'smooth'})
        else if (targetSectionId) document.getElementById(targetSectionId)?.scrollIntoView({behavior: 'smooth'})
    }, [targetSectionName, targetSectionId])
}
