import {ParameterValueEncoder} from "../types"

const decodeBool: ParameterValueEncoder<boolean | null> = value => {
    if (value === null) {
        return null
    }
    return value ? '1' : '0'
}
export default decodeBool
