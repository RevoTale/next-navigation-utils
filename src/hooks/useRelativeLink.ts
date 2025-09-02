'use client'
import {usePathname, useSearchParams} from 'next/navigation'
import type { RelativeURL } from '../types'
import { useMemo } from 'react'



const useCurrentLink = (): RelativeURL => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    return useMemo<RelativeURL>(() => ({
        pathname,
        search: searchParams
    }),[pathname, searchParams])
}

export default useCurrentLink
