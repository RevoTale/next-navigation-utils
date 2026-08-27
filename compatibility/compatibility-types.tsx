// biome-ignore-all lint/correctness/noUndeclaredDependencies: Installed from the packed artifact in CI.
// biome-ignore-all lint/correctness/noUnresolvedImports: Installed from the packed artifact in CI.
import type { ParameterOptions } from 'next-navigation-utils'
import { useParamState } from 'next-navigation-utils/client'
import { pageType, stringType } from 'next-navigation-utils/parameters'

const pageParameter: ParameterOptions<number> = {
  name: 'page',
  ...pageType,
}

const valueParameter = {
  name: 'value',
  ...stringType,
}

export const useCompatibilityTypes = () => {
  const [page, setPage] = useParamState(pageParameter)
  const [value, setValue] = useParamState(valueParameter, {
    updateValue: link => link.setValue(pageParameter, 1),
  })

  return { page, setPage, setValue, value }
}
