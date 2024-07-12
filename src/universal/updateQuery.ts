import {ParameterOptions, QueryParameters} from "../types"

const updateQuery = <T>(
    query: QueryParameters,
    {name, encode}: Pick<ParameterOptions<T>, 'name' | 'encode'>,
    value: T
): QueryParameters => {

    const formattedValue = encode(value)
    return {
        ...query,
        [name]: formattedValue === null ? undefined : formattedValue,
    }
}
export default updateQuery
