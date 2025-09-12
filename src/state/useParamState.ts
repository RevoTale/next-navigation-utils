'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { Linker, ParameterOptions, RelativeLinkBuilder, RelativeURL } from "../types"
import {useDebouncedCallback} from 'use-debounce'
import useSearchParam from "../client/useSearchParam"
import { useRelativeLink } from "../client"
import createLinker from "../utils/createLinker"
export type SetStateCallback<T,> = (value:T)=>void
const defaultDebounceTimer = 1000
 

export interface ParamsStateOptions {
    debounce?: number //Default 1000ms. Interval after shich state is being commited to the url.
    updateValue?: (link: RelativeLinkBuilder, source: Linker<RelativeURL>) =>RelativeLinkBuilder
}
const useParamState = <T>(params: ParameterOptions<T>, {
    debounce = defaultDebounceTimer,
    updateValue
}: ParamsStateOptions = {}): [T, SetStateCallback<T>] => {
    const router =  useRouter()
    const link = useRelativeLink()
    const queryValue =  useSearchParam(params)
    const [value,setValue] = useState<T>(queryValue)

    const updateQueryValue = useDebouncedCallback((value:T)=>{
        const linkBuilder = createLinker(link)

        const updatedLink = linkBuilder.setValue(params,value)
        const valueMiddleware  = updateValue === undefined?updatedLink:updateValue(updatedLink,linkBuilder)

        router.push(valueMiddleware.getLink().asString())

    },debounce)
    useEffect(()=>{ 
        const currentLink = link.asString()
        const inputValueURL = createLinker(link).setValue(params,value).asString();
        if (inputValueURL !== currentLink && !updateQueryValue.isPending()) {
            setValue(queryValue)
        }
    },[debounce, link, params, queryValue, updateQueryValue, value])

    return [value,(value:T)=>{
        setValue(value)
        updateQueryValue(value)
    }]
}

export default useParamState