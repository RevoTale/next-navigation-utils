'use client'
import {useLinker,useRelativeLink,encodeBool,decodeString} from "@/dist-lib"

const CurrentUrlBlock = () => {
    const currentUrl = useRelativeLink()
    const link = useLinker()
    const bookParamLink = link()
    bookParamLink.setValue({
        encode: encodeBool,
        name: 'book_param'
    }, true)
    bookParamLink.setValue({
        encode: decodeString,
        name: 'das_ist'
    }, 'das_ist_string');

    const stringParamLink = link()
    stringParamLink.setValue({
        encode: decodeString,
        name: 'string_param'
    }, 'params_some')
    console.log('CurrentUrlBlock render', {currentUrl:currentUrl.toString(), bookParamLink:bookParamLink.toString(), stringParamLink})
    return <div>
        <div data-testid="current_url">{currentUrl.toString()}</div>
        <div data-testid="current_url_1">{bookParamLink.toString()}</div>
        <div data-testid="current_url_2">{link().toString()}</div>
        <div data-testid="current_url_3">{stringParamLink.toString()}</div>
    </div>
}
export default CurrentUrlBlock
