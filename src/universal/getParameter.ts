import {ReadonlyURLSearchParams} from 'next/navigation'
import {ParameterOptions} from "../types"

type Options<T> = {
	params: ReadonlyURLSearchParams | null
} & ParameterOptions<T>

const getParameter = <T>({name, params, decode}: Options<T>): T => {
	if (params && params.has(name)) {
		const values = params.getAll(name)
		if (values.length === 1) {
			return decode(values[0])
		}
		return decode(values)
	}
	return decode(null)
}
export default getParameter
