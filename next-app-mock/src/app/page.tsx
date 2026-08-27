import { getQueryParamValue, type QueryParameters } from 'next-navigation-utils'
import { stringType } from 'next-navigation-utils/parameters'

const Page = async ({ searchParams }: { searchParams: Promise<QueryParameters> }) => {
  const value = getQueryParamValue(await searchParams, {
    name: 'string_param',
    ...stringType,
  })
  return <div data-testid="search_params_str">{value}</div>
}
export default Page
