'use client'
import decodeString from "../../src/common/decodeString"
import encodeBool from "../../src/common/encodeBool"
import useCurrentLink from "../../src/hooks/useCurrentLink"
import useLinker from "../../src/hooks/useLinker"

const CurrentUrlBlock = () => {
    const currentUrl = useCurrentLink()
    const link = useLinker()
    return <div>
        <div data-testid="current_url">{currentUrl}</div>
        <div data-testid="current_url_1">{link().setValue({
            encode: encodeBool,
            name: 'book_param'
        }, true).setValue({
            encode: decodeString,
            name: 'das_ist'
        }, 'das_ist_string').toString()}</div>
        <div data-testid="current_url_2">{link().toString()}</div>
        <div data-testid="current_url_3">{link().setValue({
            encode: decodeString,
            name: 'string_param'
        }, 'params_some').toString()}</div>

    </div>
}
export default CurrentUrlBlock
