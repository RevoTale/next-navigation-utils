import type {ParameterValueEncoder} from "../types"

const encodeNumber: ParameterValueEncoder<number | null> = value => value === null ? null : value.toString()
export default encodeNumber
