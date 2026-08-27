'use client'
import { useLinker, useRelativeLink } from 'next-navigation-utils/client'
import { boolType, stringType } from 'next-navigation-utils/parameters'

const CurrentUrlBlock = () => {
  const currentUrl = useRelativeLink()
  const link = useLinker()
  return (
    <div>
      <div data-testid="current_url">{currentUrl.asString()}</div>
      <div data-testid="current_url_1">
        {link()
          .setValue({ name: 'book_param', ...boolType }, true)
          .setValue({ name: 'das_ist', ...stringType }, 'das_ist_string')
          .asString()}
      </div>
      <div data-testid="current_url_2">{link().asString()}</div>
      <div data-testid="current_url_3">
        {link()
          .setValue(
            {
              ...stringType,
              name: 'string_param',
            },
            'params_some',
          )
          .asString()}
      </div>
    </div>
  )
}
export default CurrentUrlBlock
