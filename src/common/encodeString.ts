import {ParameterValueEncoder} from "../types"

const encodeString: ParameterValueEncoder<string | null> = value => {
	return value === null ? null : value
}
export default encodeString
