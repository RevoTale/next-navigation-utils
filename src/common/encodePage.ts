import {ParameterValueEncoder} from "../types"

const encodePage: ParameterValueEncoder<number> = value => {
    return value === 1 ? null : value.toString()
}
export default encodePage
