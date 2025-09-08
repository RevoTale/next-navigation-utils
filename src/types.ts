import type { ReadonlyURLSearchParams } from "next/navigation";

export type QueryParameterValue = string | string[] | null
export type QueryParameters = Record<string, string | string[] | undefined>;

export type ParameterValueEncoder<T> = (value: T) => QueryParameterValue
export type ParameterValueDecoder<T> = (value: QueryParameterValue) => T

export interface ParameterValueCoderOptions<T> {
    decode: ParameterValueDecoder<T>
    encode: ParameterValueEncoder<T>
}
export type ParameterOptions<T> = {
     name: string
} & ParameterValueCoderOptions<T>
export type RelativePathname = `/${string}` | ''

export interface RelativeURL {
   readonly pathname: RelativePathname
   readonly search: ReadonlyURLSearchParams|URLSearchParams
   readonly asString: () => string
}