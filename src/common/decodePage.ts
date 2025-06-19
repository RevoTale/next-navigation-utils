import type {ParameterValueDecoder} from "../types"
import decodeNumber from "./decodeNumber"

const DEFAULT_PAGE = 1
const MIN_PAGE = 1

const decodePage: ParameterValueDecoder<number> = param => {
	const number = decodeNumber(param)
	return number === null ? DEFAULT_PAGE : Math.max(Math.trunc(number), MIN_PAGE)
}
export default decodePage
