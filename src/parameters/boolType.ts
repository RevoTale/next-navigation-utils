import makeParamType from "../utils/makeParamType";
import type {ParameterValueDecoder, ParameterValueEncoder} from "../types"

const decodeBool: ParameterValueDecoder<boolean | null> = value => {
    if (value === '1') {
        return true
    }
    if (value === '0') {
        return false
    }
    return null
}

const encodeBool: ParameterValueEncoder<boolean|null> = value => {
    if (value === null) {
        return null
    }
    return value?'1':'0'
}
export default makeParamType<boolean|null>(decodeBool,encodeBool)