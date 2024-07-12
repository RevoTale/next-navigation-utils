import {ParameterValueDecoder} from "../types"

const decodeString: ParameterValueDecoder<string | null> = param => {
	if (typeof param === 'string') {
		return param
	} else if (param === null) {
		return null
	}
	return param[0]
}
export default decodeString
