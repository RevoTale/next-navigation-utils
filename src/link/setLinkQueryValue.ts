import {ParameterOptions} from "../types"
import setSearchParamValue from "../searchParams/setSearchParamValue"

const setLinkQueryValue = <T>(
    link: string,
    opts: ParameterOptions<T>,
    value: T
): string => {
    const url = new URL(link, 'https://example.com')
    setSearchParamValue(url.searchParams, opts, value)
    return `${url.pathname}${url.search}`
}

export default setLinkQueryValue
