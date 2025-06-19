import type {ParameterOptions} from "../types"

const SINGLE_VALUE_LENGTH = 1
const FIRST_VALUE_INDEX = 0

const getSearchParamValue = <T>(params: URLSearchParams, {
    name,
    decode
}: Pick<ParameterOptions<T>, 'name' | 'decode'>): T => {
    if (params.has(name)) {
        const values = params.getAll(name)
        if (values.length === SINGLE_VALUE_LENGTH) {
            return decode(values[FIRST_VALUE_INDEX])
        }
        return decode(values)
    }
    return decode(null)
}

export default getSearchParamValue
