import type {ParameterValueEncoder,ParameterValueDecoder} from "../types"
import makeParamType from "../utils/makeParamType"

const FIRST_ELEMENT_INDEX = 0

const decodeString: ParameterValueDecoder<string | null> = param => {
	if (typeof param === 'string') {
		return param
	} else if (param === null) {
		return null
	}
	return param[FIRST_ELEMENT_INDEX]
}
const encodeString: ParameterValueEncoder<string | null> = value => value ?? null
export default makeParamType<string|null>(decodeString,encodeString)
