import type { Linker, ParameterOptions, RelativeLinkBuilder, RelativeURL} from "../types"
import setSearchParamValue from "../searchParams/setSearchParamValue"
import createRelativeLink from "./createRelativeLink"



  
const startBuilder = ({pathname,search}:RelativeURL):RelativeLinkBuilder=>{
        const newSearch = new URLSearchParams()
        search.forEach((value, key) => {
            newSearch.append(key, value)
        })
        const builder:RelativeLinkBuilder =  {
            setValue:(param,value)=>{
                  setSearchParamValue(newSearch, param, value)
                  return builder
            },
            getLink:()=>createRelativeLink(pathname,newSearch),
            asString:()=>builder.getLink().asString()
        }
        return builder
}
const createLinker = (link: RelativeURL): Linker<RelativeURL> => {

 

    const getValue = <V>({decode, name}: Pick<ParameterOptions<V>, 'name' | 'decode'>): V => 
        decode(link.search.getAll(name))

    const linker: Linker<RelativeURL> = {
        setValue:(param,value)=>startBuilder(link).setValue(param,value),
        getValue,
        getLink:()=>link,
        asString:()=>linker.getLink().asString()
    }
    return linker
}

export default createLinker
