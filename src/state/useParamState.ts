'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { ParameterOptions, RelativeURL } from "../types"
import {useDebouncedCallback} from 'use-debounce'
import useSearchParam from "../hooks/useSearchParam"
import type { LinkBuilder, Linker } from "../utils/createLinker"
import { useRelativeLink } from "../client"
import createLinker from "../utils/createLinker"
type SetStateCallback<T,> = (value:T)=>void
const defaultDebounceTimer = 1000
export type UpdateValueCallback =  <T,>() => [Pick<ParameterOptions<T>, 'name' | 'encode'>,T]
interface ParamsStateOptions {
    debounce?: number //Default 1000ms. Interval after shich state is being commited to the url.
    updateValues?: (modified: LinkBuilder,source:Linker<RelativeURL>) => UpdateValueCallback[] // Usage example: page reset when selecting the search form filter values
}
const useParamState=<T,>(params:ParameterOptions<T>,{
    debounce = defaultDebounceTimer,
    updateValues
}:ParamsStateOptions={}):[T,SetStateCallback<T>]=>{
    const router =  useRouter()
    const link = useRelativeLink()
    const queryValue =  useSearchParam(params)
    const [value,setValue] = useState<T>(queryValue)

    const updateQueryValue = useDebouncedCallback((value:T)=>{
        const linkBuilder = createLinker(link)

        const updatedLink = linkBuilder.setValue(params,value)
        const valuesToUpdate  = updateValues === undefined?[]:updateValues(updatedLink,linkBuilder)
        
        router.push((valuesToUpdate.reduce((link,entry)=>{
            const [param,value] = entry()
            return link.setValue(param,value)
        }, updatedLink).getLink()).asString())
    },debounce)
    useEffect(()=>{ 
        const currentLink = link.asString()
        const inputValueURL = createLinker(link).setValue(params,value).asString();
        if (inputValueURL !== currentLink && !updateQueryValue.isPending()) {
            setValue(queryValue)
        }
    },[debounce, link,queryValue,value])

    return [value,(value:T)=>{
        setValue(value)
        updateQueryValue(value)
    }]
}
export default useParamState