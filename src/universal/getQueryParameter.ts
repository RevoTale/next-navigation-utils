import {ParameterOptions} from "../types"

const getQueryParameter = <T>(
	params: Record<string, string | string[] | undefined>,
	{name, decode}: ParameterOptions<T>
): T => {
	return decode(params[name]??null)
}
export default getQueryParameter
