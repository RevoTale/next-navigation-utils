'use client'
import {usePathname, useSearchParams} from 'next/navigation'
import type { RelativeURL } from '../types'
import { useMemo } from 'react'
import createRelativeLink from '../utils/createRelativeLink';

const useRelativeLink = (): RelativeURL => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    return useMemo<RelativeURL>(() => createRelativeLink(pathname, searchParams),[pathname, searchParams])
}

export default useRelativeLink
