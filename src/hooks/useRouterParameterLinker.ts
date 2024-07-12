import {usePathname, useSearchParams} from 'next/navigation'
import {ParameterOptions} from "../types"
import updateUrlWithParameter from "../universal/updateUrlWithParameter"

const useRouterParameterLinker = () => {
	const pathname = usePathname()
	const params = useSearchParams()
	return <T>(
		parameterOptions: ParameterOptions<T>,
		parameterValue: T,
		basedOn?: string
	) => {
		return updateUrlWithParameter(
			basedOn || `${pathname}?${params.toString()}`,
			parameterOptions,
			parameterValue
		)
	}
}

export default useRouterParameterLinker
