import decodeString from "../../../src/common/decodeString"
import getQueryParamValue from "../../../src/query/getQueryParamValue"
import {QueryParameters} from "../../../src/types"

const Page = ({searchParams}:{searchParams:QueryParameters}) => {
    const value = getQueryParamValue(searchParams,{
        name:'string_param',
        decode:decodeString
    })
    return <div data-testid="searchParamsStr">
        {value}
    </div>
}
export default Page
