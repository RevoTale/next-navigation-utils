import getLinkQueryValue from "./link/getLinkQueryValue"
import setLinkQueryValue from "./link/setLinkQueryValue"
import {ParameterOptions} from "./types"

export type Linker = {
    setValue: <T>(opt: ParameterOptions<T>, value: T) => void,
    getValue: <T>(opt: ParameterOptions<T>) => void
}
const createLinker = (link: string): Linker => {

    return {
        setValue: (opt, value) => {
            link = setLinkQueryValue(link, opt, value)
        },
        getValue: (opt) => {
            return getLinkQueryValue(link, opt)
        }
    }
}
export default createLinker
