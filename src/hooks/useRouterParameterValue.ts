'use client'
import {useSearchParams} from 'next/navigation'
import {ParameterOptions} from "../types"
import getParameter from "../universal/getParameter"

const useRouterParameterValue = <T>(
	options: ParameterOptions<T>
): T => {
	return getParameter({
		params: useSearchParams(),
		...options,
	})
}
export default useRouterParameterValue
