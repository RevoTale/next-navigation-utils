import { URLSearchParams } from "url"
import type {ParameterOptions, RelativeURL} from "../types"
import setSearchParamValue from "../searchParams/setSearchParamValue"
import getNormalizedQueryStr from "./getNormalizedQueryStr"

export interface Linker<T  extends RelativeURL|URL> {
    setValue: <V>(opt: Pick<ParameterOptions<V>, 'name' | 'encode'>, value: V) => void,
    getValue: <V>(opt: Pick<ParameterOptions<V>, 'name' | 'decode'>) => V
    getLink: () => T
    toString: () => string
}

// Function overloads provide compile-time type safety
function createLinker(link: URL): Linker<URL>
function createLinker(link: RelativeURL): Linker<RelativeURL>
function createLinker(link: RelativeURL | URL): Linker<RelativeURL | URL>
function createLinker(link: RelativeURL | URL): Linker<RelativeURL | URL> {
    const search = new URLSearchParams(link.search.toString())
    
    // Shared implementation for both setValue and getValue
    const setValue = <V>(opt: Pick<ParameterOptions<V>, 'name' | 'encode'>, value: V): void => {
        setSearchParamValue(search, opt, value)
    }


    const getValue = <V>({decode, name}: Pick<ParameterOptions<V>, 'name' | 'decode'>): V => 
        decode(search.getAll(name))
    
    if (link instanceof URL) {
        const getLink = (): URL => new URL(`${link.pathname}${getNormalizedQueryStr(search)}`, link.origin)
        const linker: Linker<URL> = {
            setValue,
            getValue,
            getLink,
            toString: () => getLink().toString()
        }
        return linker
    }
    const linker: Linker<RelativeURL> = {
        setValue,
        getValue,
        getLink: () => ({
            pathname: link.pathname,
            search,
            toString: () => `${link.pathname}${getNormalizedQueryStr(search)}`
        })
    }
    return linker
}

export default createLinker
