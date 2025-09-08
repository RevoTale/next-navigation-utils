import type { ParameterOptions, ParameterValueDecoder, ParameterValueEncoder } from "../types"

const makeParamType = <T,>(decode:ParameterValueDecoder<T>,encode:ParameterValueEncoder<T>):Pick<ParameterOptions<T>, 'decode' | 'encode'>=>({
        encode,decode
    })
export default makeParamType