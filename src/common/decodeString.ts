import type {ParameterValueDecoder} from "../types"

const FIRST_ELEMENT_INDEX = 0

const decodeString: ParameterValueDecoder<string | null> = param => {
	if (typeof param === 'string') {
		return param
	} else if (param === null) {
		return null
	}
	return param[FIRST_ELEMENT_INDEX]
}
export default decodeString
