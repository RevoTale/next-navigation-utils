export type QueryParameterValue = string | string[] | null
export type QueryParameters = { [key: string]: string | string[] | undefined }

export type ParameterValueEncoder<T> = (value: T) => QueryParameterValue
export type ParameterValueDecoder<T> = (value: QueryParameterValue) => T

export type ParameterValueCoderOptions<T> = {
    decode: ParameterValueDecoder<T>
    encode: ParameterValueEncoder<T>
}
export type ParameterOptions<T> = {
    name: string
} & ParameterValueCoderOptions<T>
