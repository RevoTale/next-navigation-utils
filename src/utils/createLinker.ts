import type {ParameterOptions, RelativeURL} from "../types"
import setSearchParamValue from "../searchParams/setSearchParamValue"
import createRelativeLink from "./createRelativeLink"

export type SetValueCallback =  <T,>(opt: Pick<ParameterOptions<T>, 'name' | 'encode'>, value: T) => LinkBuilder    ,
export type GetValueCallback = <V>(opt: Pick<ParameterOptions<V>, 'name' | 'decode'>) => V
export interface Linker<T extends RelativeURL> {
    setValue: SetValueCallback,
    getValue: GetValueCallback,
    getLink: () => T
    toString: () => string
}
interface LinkBuilder {
    setValue:  SetValueCallback
    getLink: () => RelativeURL
}

  
const startBuilder = ({pathname,search}:RelativeURL):LinkBuilder=>{
        const newSearch = new URLSearchParams()
        search.forEach((value, key) => {
            newSearch.append(key, value)
        })
        const builder:LinkBuilder =  {
            setValue:(param,value)=>{
                  setSearchParamValue(newSearch, param, value)
                  return builder
            },
            getLink:()=>createRelativeLink(pathname,newSearch)
        }
        return builder
}
const createLinker = (link: RelativeURL): Linker<RelativeURL> => {

 

    const getValue = <V>({decode, name}: Pick<ParameterOptions<V>, 'name' | 'decode'>): V => 
        decode(link.search.getAll(name))

    const linker: Linker<RelativeURL> = {
        setValue:(param,value)=>{
            return startBuilder(link).setValue(param,value)
        },
        getValue,
        getLink:()=>link,
        toString
    }
    return linker
}

export default createLinker
