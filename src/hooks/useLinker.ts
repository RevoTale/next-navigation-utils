'use client'
import { useCallback } from "react"
import createLinker, {type Linker} from "../createLinker"
import type { RelativeURL } from "../types"
import useCurrentLink from "./useRelativeLink"

const useLinker = (): () => Linker<RelativeURL> => {
    const link = useCurrentLink()
    return useCallback((): Linker<RelativeURL> => createLinker(link),[link])
}

export default useLinker
