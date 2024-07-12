import {ParameterOptions} from "../types"


const getSearchParamValue = <T>(params: URLSearchParams, {
    name,
    decode
}: Pick<ParameterOptions<T>, 'name' | 'decode'>): T => {
    if (params && params.has(name)) {
        const values = params.getAll(name)
        if (values.length === 1) {
            return decode(values[0])
        }
        return decode(values)
    }
    return decode(null)
}

export default getSearchParamValue
