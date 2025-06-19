import type {ParameterOptions} from "../types"

const setSearchParamValue = <T>(params: URLSearchParams, {
    name,
    encode
}: Pick<ParameterOptions<T>, 'name' | 'encode'>, value: T): void => {
    const encoded = encode(value)
    params.delete(name)

    if (encoded !== null) {
        if (typeof encoded === 'string') {
            params.set(name, encoded)
        } else {
            for (const item of encoded) {
                params.append(name, item)
            }
        }
    }
}

export default setSearchParamValue
