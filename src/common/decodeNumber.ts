import {ParameterValueDecoder} from "../types"

const decodeNumber: ParameterValueDecoder<number | null> = param => {
	if (typeof param === 'string') {
		const number = Number(param)
		if (isNaN(number)) {
			return null
		}
		return number
	}
	return null
}
export default decodeNumber
