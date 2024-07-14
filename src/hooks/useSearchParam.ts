import {useSearchParams} from "next/navigation"
import getSearchParamValue from "../searchParams/getSearchParamValue"
import {ParameterOptions} from "../types"

const useSearchParam = <T, >(opts: Pick<ParameterOptions<T>, 'decode' | 'name'>) => {
    return getSearchParamValue(useSearchParams(), opts)
}
export default useSearchParam
