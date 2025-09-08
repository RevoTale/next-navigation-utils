'use client'
import {encodeBool,decodeString} from "@/dist-lib"
import {useLinker,useRelativeLink,} from "@/dist-lib/client"
const CurrentUrlBlock = () => {
    const currentUrl = useRelativeLink()
    const link = useLinker()
    return <div>
        <div data-testid="current_url">{currentUrl.asString()}</div>
        <div data-testid="current_url_1">{link().setValue({name: 'book_param', encode: encodeBool}, true).setValue({name: 'das_ist', encode: decodeString}, 'das_ist_string').asString()}</div>
        <div data-testid="current_url_2">{link().asString()}</div>
        <div data-testid="current_url_3">{ link().setValue({
        encode: decodeString,
        name: 'string_param'
    }, 'params_some').asString()}</div>
    </div>
}
export default CurrentUrlBlock
