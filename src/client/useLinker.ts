'use client'
import { useCallback } from "react"
import createLinker from "../utils/createLinker"
import type { Linker, RelativeURL } from "../types"
import useRelativeLink from "./useRelativeLink"

const useLinker = (): () => Linker<RelativeURL> => {
    const link = useRelativeLink()
    return useCallback((): Linker<RelativeURL> => createLinker(link),[link])
}

export default useLinker
