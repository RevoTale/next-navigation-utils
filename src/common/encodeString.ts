import type {ParameterValueEncoder} from "../types"

const encodeString: ParameterValueEncoder<string | null> = value => value ?? null
export default encodeString
