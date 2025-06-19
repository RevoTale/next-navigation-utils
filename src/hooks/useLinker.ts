'use client'
import createLinker, {type Linker} from "../createLinker"
import useCurrentLink from "./useCurrentLink"

const useLinker = () => {
    const link = useCurrentLink()
    return (): Linker => createLinker(link)
}

export default useLinker
