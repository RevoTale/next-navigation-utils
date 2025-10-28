'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type {  ParameterOptions, ParamsStateOptions} from "../types"
import {useDebouncedCallback} from 'use-debounce'
import useSearchParam from "../client/useSearchParam"
import { useRelativeLink } from "../client"
import createLinker from "../utils/createLinker"
export type SetStateCallback<T,> = (value:T)=>void
const defaultDebounceTimer = 1000
 


const useParamState = <T>(params: ParameterOptions<T>, {
    debounce = defaultDebounceTimer,
    updateValue,
    navigate
}: ParamsStateOptions = {}): [T, SetStateCallback<T>] => {
    const router =  useRouter()
    const link = useRelativeLink()
    const queryValue =  useSearchParam(params)
    const [value,setValue] = useState<T>(queryValue)

    const updateQueryValue = useDebouncedCallback((value:T)=>{
        const linkBuilder = createLinker(link)

        const updatedLink = linkBuilder.setValue(params,value)
        const valueMiddleware  = updateValue === undefined?updatedLink:updateValue(updatedLink,linkBuilder)
        const targetHref = valueMiddleware.getLink().asString()
        if (navigate?.push === true) {
            router.push(targetHref,navigate)
            return
        }
        router.replace(targetHref,navigate)
    },debounce)
    useEffect(()=>{ 
        const currentLink = link.asString()
        const inputValueURL = createLinker(link).setValue(params,value).asString();
        if (inputValueURL !== currentLink && !updateQueryValue.isPending()) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- haven't found workaround yet. Looking for the best practice
            setValue(queryValue)
        }
    },[debounce, link, params, queryValue, updateQueryValue, value])

    return [value,(value:T)=>{
        setValue(value)
        updateQueryValue(value)
    }]
}

export default useParamState