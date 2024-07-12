'use client'
import createLinker, {Linker} from "../createLinker"
import useCurrentLink from "./useCurrentLink"

const useLinker = () => {
    const link = useCurrentLink()
    return (): Linker => {
        return createLinker(link)
    }
}

export default useLinker
