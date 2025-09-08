'use client'
import {useSearchParams} from "next/navigation"
import getSearchParamValue from "../searchParams/getSearchParamValue"
import type {ParameterOptions} from "../types"
import { useMemo } from "react"

const useSearchParam = <T, >({decode,name}: Pick<ParameterOptions<T>, 'decode' | 'name'>): T => {
    const params = useSearchParams()
    return useMemo(()=>getSearchParamValue(params, {decode,name}),[decode, name, params])
}
export default useSearchParam
