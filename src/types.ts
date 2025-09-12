import type { ReadonlyURLSearchParams } from "next/navigation";

export type QueryParameterValue = string | string[] | null
export type QueryParameters = Record<string, string | string[] | undefined>;

export type ParameterValueEncoder<T> = (value: T) => QueryParameterValue
export type ParameterValueDecoder<T> = (value: QueryParameterValue) => T

export interface ParameterValueCoderOptions<T> {
    decode: ParameterValueDecoder<T>
    encode: ParameterValueEncoder<T>
}
export interface Linker<T extends URL|RelativeURL> {
    setValue: SetValueCallback<T>,
    getValue: GetValueCallback,
    getLink: () => T
    asString: () => string
}
export interface AbsoltuteLinkBuilder {
    setValue:  SetValueCallback<URL>
    getLink: () => URL
    asString:()=>string
}
export interface ParameterOptions<T,> extends ParameterValueCoderOptions<T> {
     name: string
}
export interface ValuedParameter<T> extends ParameterOptions<T> {
    value: T
}
export type RelativePathname = `/${string}` | ''

export interface RelativeURL {
   readonly pathname: RelativePathname
   readonly search: ReadonlyURLSearchParams|URLSearchParams
   readonly asString: () => string
}
export type SetValueCallback<R extends URL|RelativeURL,N = R extends URL?AbsoltuteLinkBuilder:RelativeLinkBuilder> =  <T>(opt: Pick<ParameterOptions<T>, 'name' | 'encode'>, value: T) => N
export type GetValueCallback = <V>(opt: Pick<ParameterOptions<V>, 'name' | 'decode'>) => V

export interface RelativeLinkBuilder {
    setValue:  SetValueCallback<RelativeURL>
    getLink: () => RelativeURL
    asString:()=>string
}