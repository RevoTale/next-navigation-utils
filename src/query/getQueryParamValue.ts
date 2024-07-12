import {ParameterOptions, QueryParameters} from "../types"

const getQueryParamValue = <T>(
	params: QueryParameters,
	{name, decode}: ParameterOptions<T>
): T => {
	return decode(params[name]??null)
}
export default getQueryParamValue
