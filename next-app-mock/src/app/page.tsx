import decodeString from "../../../src/common/decodeString"
import getQueryParamValue from "../../../src/query/getQueryParamValue"
import {QueryParameters} from "../../../src"

const Page = ({searchParams}:{searchParams:QueryParameters}) => {
    const value = getQueryParamValue(searchParams,{
        name:'string_param',
        decode:decodeString
    })
    return <div data-testid="search_params_str">
        {value}
    </div>
}
export default Page
