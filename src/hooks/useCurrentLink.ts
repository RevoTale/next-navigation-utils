'use client'
import {usePathname, useSearchParams} from 'next/navigation'

const useCurrentLink = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams().toString()
    return `${pathname}${searchParams ? `?${searchParams}` : ''}`
}

export default useCurrentLink
