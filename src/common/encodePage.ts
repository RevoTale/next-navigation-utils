import type {ParameterValueEncoder} from "../types"

const DEFAULT_PAGE = 1

const encodePage: ParameterValueEncoder<number> = value => value === DEFAULT_PAGE ? null : value.toString()
export default encodePage
