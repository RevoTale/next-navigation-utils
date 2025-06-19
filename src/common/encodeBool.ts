import type {ParameterValueEncoder} from "../types"

const encodeBool: ParameterValueEncoder<boolean|null> = value => {
    if (value === null) {
        return null
    }
    return value?'1':'0'
}
export default encodeBool
