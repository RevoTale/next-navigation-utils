import type {ParameterOptions} from "../types"
import setSearchParamValue from "../searchParams/setSearchParamValue"

export type SetValueCallback =  <T,>(opt: Pick<ParameterOptions<T>, 'name' | 'encode'>, value: T) => LinkBuilder
export type GetValueCallback = <V>(opt: Pick<ParameterOptions<V>, 'name' | 'decode'>) => V
export interface Linker<T extends URL> {
    setValue: SetValueCallback,
    getValue: GetValueCallback,
    getLink: () => T
    toString: () => string
}
interface LinkBuilder {
    setValue:  SetValueCallback
    getLink: () => URL
}

  
const startBuilder = (url:URL):LinkBuilder=>{
        const newSearch = new URLSearchParams()
        url.searchParams.forEach((value, key) => {
            newSearch.append(key, value)
        })
        const builder:LinkBuilder =  {
            setValue:(param,value)=>{
                  setSearchParamValue(newSearch, param, value)
                  return builder
            },
            getLink:()=>{
                const newURL = new URL(url)
                newSearch.forEach((value, key) => {
                    newURL.searchParams.append(key, value)
                })
                return newURL
            }
        }
        return builder
}
const createLinker = (link: URL): Linker<URL> => {

 

    const getValue = <V>({decode, name}: Pick<ParameterOptions<V>, 'name' | 'decode'>): V => 
        decode(link.searchParams.getAll(name))

    const linker: Linker<URL> = {
        setValue:(param,value)=>startBuilder(link).setValue(param,value),
        getValue,
        getLink:()=>link,
        toString
    }
    return linker
}

export default createLinker
