'use client'
import {usePathname, useSearchParams} from 'next/navigation'

const EMPTY_STRING_LENGTH = 0

const useCurrentLink = (): string => {
    const pathname = usePathname()
    const searchParams = useSearchParams().toString()
    return `${pathname}${searchParams.length > EMPTY_STRING_LENGTH ? `?${searchParams}` : ''}`
}

export default useCurrentLink
