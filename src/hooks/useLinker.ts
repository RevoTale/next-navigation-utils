import {ParameterOptions} from "../types"
import updateUrlWithParameter from "../universal/updateUrlWithParameter"

const useLinker = (baseLink: string) => {
	return <T>(
		parameterOptions: ParameterOptions<T>,
		parameterValue: T
	) => {
		return updateUrlWithParameter(baseLink, parameterOptions, parameterValue)
	}
}

export default useLinker
