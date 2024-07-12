import {ParameterValueEncoder} from "../types"

const encodeNumber: ParameterValueEncoder<number | null> = value => {
	return value === null ? null : value.toString()
}
export default encodeNumber
