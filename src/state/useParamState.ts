'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { ParameterOptions, RelativeURL } from "../types"
import {useDebouncedCallback} from 'use-debounce'
import useLinker from "../hooks/useLinker"
import useSearchParam from "../hooks/useSearchParam"
import type { Linker } from "../utils/createLinker"
type SetStateCallback<T,> = (value:T)=>void
const defaultDebounceTimer = 1000
interface ParamsStateOptions {
    debounce?: number //Default 1000ms. Interval after shich state is being commited to the url.
    modifyState?: (value: Linker<RelativeURL>) => void // Usage example: page reset when selecting the search form filter values
}
const useParamState=<T,>(params:ParameterOptions<T>,{
    debounce = defaultDebounceTimer,
    modifyState 
}:ParamsStateOptions={}):[T,SetStateCallback<T>]=>{
    const router =  useRouter()
    const linker = useLinker()
    const queryValue =  useSearchParam(params)
    const [value,setValue] = useState<T>(queryValue)

    const updateQueryValue = useDebouncedCallback((value:T)=>{
        const builder = linker()
        builder.setValue(params,value)
        if (undefined !== modifyState) {
            modifyState(builder)
        }
        router.push((builder.getLink()).asString())
    },debounce)
    useEffect(()=>{
        const builder =  linker()
        const currentLink = builder.asString()
        const inputValueURL = builder.setValue(params,value).asString();

        if (inputValueURL !== currentLink && !updateQueryValue.isPending()) {
            setValue(queryValue)
        }
    },[debounce, linker,queryValue,value])

    return [value,(value:T)=>{
        setValue(value)
        updateQueryValue(value)
    }]
}
export default useParamState