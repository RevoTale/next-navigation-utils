import type {ParameterOptions, QueryParameters} from "../types"

const setQueryParamValue = <T>(
    query: QueryParameters,
    {name, encode}: Pick<ParameterOptions<T>, 'name' | 'encode'>,
    value: T
): QueryParameters => ({
        ...query,
        [name]: encode(value) ?? undefined,
    })

export default setQueryParamValue
