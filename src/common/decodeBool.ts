import {ParameterValueDecoder} from "../types"

const decodeBool: ParameterValueDecoder<boolean | null> = value => {
    if (value === '1') {
        return true
    }
    if (value === '0') {
        return false
    }
    return null
}
export default decodeBool
