'use client'
import {usePathname, useSearchParams} from "next/navigation"
import setLinkQueryValue from "../link/setLinkQueryValue"
import {ParameterOptions} from "../types"

const useLinker = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    return <T>(
        parameterOptions: ParameterOptions<T>,
        parameterValue: T
    ) => {
        return setLinkQueryValue(`${pathname}?${searchParams.toString()}`, parameterOptions, parameterValue)
    }
}

export default useLinker
