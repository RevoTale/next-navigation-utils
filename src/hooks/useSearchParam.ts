'use client'
import {useSearchParams} from "next/navigation"
import getSearchParamValue from "../searchParams/getSearchParamValue"
import type {ParameterOptions} from "../types"
import { useMemo } from "react"

const useSearchParam = <T, >({decode,name}: Pick<ParameterOptions<T>, 'decode' | 'name'>): T => {
    const param = useSearchParams()
    return useMemo(()=>getSearchParamValue(param, {decode,name}),[decode,name])
}
export default useSearchParam
