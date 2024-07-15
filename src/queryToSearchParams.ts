import {QueryParameters} from "./types"

const queryToSearchParams = (query: QueryParameters): URLSearchParams => {
    const params = new URLSearchParams
    for (const name in query) {
        const encoded = query[name]
        if (encoded === undefined) {
            continue
        }
        if (typeof encoded === 'string') {
            params.set(name, encoded)
        } else {
            for (const item of encoded) {
                params.append(name, item)
            }
        }
    }
    return params
}
export default queryToSearchParams
