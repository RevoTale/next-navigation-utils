import {ParameterOptions} from "../types"

const updateUrlWithParameter = <T>(
	currentUrl: string,
	options: ParameterOptions<T>,
	value: T
): string => {
	const url = new URL(currentUrl, 'https://example.com')
	const encoded = options.encode(value)
	url.searchParams.delete(options.name)

	if (encoded !== null) {
		if (typeof encoded === 'string') {
			url.searchParams.set(options.name, encoded)
		} else {
			for (const item of encoded) {
				url.searchParams.append(options.name, item)
			}
		}
	}
	return `${url.pathname}${url.search}`
}
export default updateUrlWithParameter
