import {ParameterValueDecoder} from "../types"
import decodeNumber from "./decodeNumber"

const decodePage: ParameterValueDecoder<number> = param => {
	const number = decodeNumber(param)
	return number === null ? 1 : Math.max(Math.trunc(number), 1)
}
export default decodePage
