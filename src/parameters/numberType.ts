import type {ParameterValueEncoder,ParameterValueDecoder} from "../types"
import makeParamType from "../utils/makeParamType";

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
const encodeNumber: ParameterValueEncoder<number | null> = value => value === null ? null : value.toString()
export default makeParamType<number|null>(decodeNumber,encodeNumber)
