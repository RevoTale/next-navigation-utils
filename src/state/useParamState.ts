import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { ParameterOptions } from "../types"
import {useDebouncedCallback} from 'use-debounce'
import useLinker from "../hooks/useLinker"
import useSearchParam from "../hooks/useSearchParam"
type SetStateCallback<T,> = (value:T)=>void
const defaultDebounceTimer = 1000
const useQueryState=<T,>(params:ParameterOptions<T>,debounceTimeout:number = defaultDebounceTimer):[T,SetStateCallback<T>]=>{
    const router =  useRouter()
    const linker = useLinker()
    const queryValue =  useSearchParam(params)
    const [value,setValue] = useState<T>(queryValue)

    const updateQueryValue = useDebouncedCallback((value:T)=>{
        router.push(linker().setValue(params,value).toString())
    },debounceTimeout)
    const currentLink = linker().toString()
    useEffect(()=>{
        if (linker().setValue(params,value).toString() !== currentLink && !updateQueryValue.isPending()) {
            setValue(value)
        }
    },[debounceTimeout,currentLink])
    return [value,(value:T)=>{
            setValue(value)
        updateQueryValue(value)
    }]
}
export default useQueryState