import {useSearchParams} from "next/navigation"
import getSearchParamValue from "../searchParams/getSearchParamValue"
import type {ParameterOptions} from "../types"

const useSearchParam = <T, >(opts: Pick<ParameterOptions<T>, 'decode' | 'name'>): T => getSearchParamValue(useSearchParams(), opts)
export default useSearchParam
