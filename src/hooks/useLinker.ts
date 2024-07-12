'use client'
import setLinkQueryValue from "../link/setLinkQueryValue"
import {ParameterOptions} from "../types"
import useCurrentLink from "./useCurrentLink";

const useLinker = () => {
    const link = useCurrentLink()
    return <T>(
        parameterOptions: ParameterOptions<T>,
        parameterValue: T
    ) => {
        return setLinkQueryValue(link, parameterOptions, parameterValue)
    }
}

export default useLinker
