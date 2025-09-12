import type { RelativeURL } from "../types"
import parseLink from "./parseLink"

const parseRelativeLink = (link: string): RelativeURL => {
    const lin = parseLink (link)
    if (lin instanceof URL) {
       throw new Error (`The link is URL`)
    }
    return lin
}
export default parseRelativeLink