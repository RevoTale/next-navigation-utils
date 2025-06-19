import type {ParameterOptions, QueryParameters} from "../types"

const getQueryParamValue = <T>(
	params: QueryParameters,
	{name, decode}: Pick<ParameterOptions<T>, 'name' | 'decode'>
): T => decode(params[name]??null)
export default getQueryParamValue
