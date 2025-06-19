
import {parse} from 'querystring'
import type {ParameterOptions} from "../types"

const getLinkQueryValue = <T>(
	currentUrl: string,
	{name, decode}: Pick<ParameterOptions<T>,'decode'|'name'>
): T => {
	const url = new URL(currentUrl, 'https://example.com')
	return decode(parse(url.searchParams.toString())[name]??null)
}

export default getLinkQueryValue
