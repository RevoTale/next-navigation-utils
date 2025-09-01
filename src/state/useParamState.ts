import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { ParameterOptions } from "../types"
import {useDebouncedCallback} from 'use-debounce'
import useLinker from "../hooks/useLinker"
import useSearchParam from "../hooks/useSearchParam"
type SetStateCallback<T,> = (value:T)=>void
const defaultDebounceTimer = 1000
const useParamState=<T,>(params:ParameterOptions<T>,debounceTimeout:number = defaultDebounceTimer):[T,SetStateCallback<T>]=>{
    const router =  useRouter()
    const linker = useLinker()
    const queryValue =  useSearchParam(params)
    const [value,setValue] = useState<T>(queryValue)

    const updateQueryValue = useDebouncedCallback((value:T)=>{
        router.push(linker().setValue(params,value).toString())
    },debounceTimeout)
    const currentLink = linker().toString()
    useEffect(()=>{
        const inputValueURL = linker().setValue(params,value).toString();

        if (inputValueURL !== currentLink && !updateQueryValue.isPending()) {
            setValue(queryValue)
        }
    },[debounceTimeout, currentLink,queryValue,value])

    return [value,(value:T)=>{
        setValue(value)
        updateQueryValue(value)
    }]
}
export default useParamState