import type {ParameterValueDecoder, ParameterValueEncoder} from "../types"
import makeParamType from "../utils/makeParamType"
import numberType from "./numberType"

const DEFAULT_PAGE = 1
const MIN_PAGE = 1
const encodePage: ParameterValueEncoder<number> = value => value === DEFAULT_PAGE ? null : value.toString()

const decodePage: ParameterValueDecoder<number> = param => {
	const number = numberType.decode(param)
	return number === null ? DEFAULT_PAGE : Math.max(Math.trunc(number), MIN_PAGE)
}
export default makeParamType<number>(decodePage,encodePage)
