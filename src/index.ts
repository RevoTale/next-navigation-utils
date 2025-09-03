// noinspection JSUnusedGlobalSymbols

export {default as getLinkQueryValue} from './link/getLinkQueryValue'
export {default as setLinkQueryValue} from './link/setLinkQueryValue'

export {default as getQueryParamValue} from './query/getQueryParamValue'
export {default as setQueryParamValue} from './query/setQueryParamValue'

export {default as getSearchParamValue} from './searchParams/getSearchParamValue'
export {default as setSearchParamValue} from './searchParams/setSearchParamValue'

export {default as createRelativeLink} from './utils/createRelativeLink'
export {default as createLinker} from './utils/createLinker'

export {default as parseRelativeLink} from './utils/parseLink'
export {default as queryToSearchParams} from './utils/queryToSearchParams'


export {default as useParamState} from './state/useParamState'
export {default as useCurrentLink} from './hooks/useRelativeLink'
export {default as useLinker} from './hooks/useLinker'
export {default as useSearchParam} from './hooks/useSearchParam'

export {default as decodeBool} from './common/decodeBool'
export {default as encodeBool} from './common/encodeBool'

export {default as decodeString} from './common/decodeString'
export {default as encodeString} from './common/encodeString'


export {default as decodeNumber} from './common/decodeNumber'
export {default as encodeNumber} from './common/encodeNumber'

export {default as decodePage} from './common/decodePage'
export {default as encodePage} from './common/encodePage'
export type {
    QueryParameters,
    QueryParameterValue,
    ParameterValueDecoder,
    ParameterValueEncoder,
    ParameterValueCoderOptions,
    ParameterOptions
} from './types'
