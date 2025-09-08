import {decodeString,getQueryParamValue,QueryParameters} from "@/dist-lib"

const Page = async ({searchParams}:{searchParams:Promise<QueryParameters>}) => {
    const value = getQueryParamValue(await searchParams,{
        name:'string_param',
        decode:decodeString
    })
    return <div data-testid="search_params_str">
        {value}
    </div>
}
export default Page
