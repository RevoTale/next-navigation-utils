import getLinkQueryValue from "./link/getLinkQueryValue"
import setLinkQueryValue from "./link/setLinkQueryValue"
import type {ParameterOptions} from "./types"

export interface Linker {
    setValue: <T>(opt: Pick<ParameterOptions<T>, 'name' | 'encode'>, value: T) => this,
    getValue: <T>(opt: Pick<ParameterOptions<T>, 'name' | 'decode'>) => T
    toString: () => string
}

const createLinker = (link: string): Linker => {
    const linker: Linker = {
        setValue: (opt, value) => {
            link = setLinkQueryValue(link, opt, value)
            return linker
        },
        getValue: (opt) => getLinkQueryValue(link, opt),
        toString: () => link
    }
    return linker
}
export default createLinker
