import { expect, test } from '@playwright/test'
import queryToSearchParams from '../src/utils/queryToSearchParams'
import createLinker from '../src/utils/createLinker'
import parseLink from '../src/utils/parseLink'

test('URL parameter handling and linker functionality', async ({ page }) => {
  page.on('console', msg => console.log(msg.text()));

  await page.goto('/')
  await expect(page).toHaveURL('/')
  
  await expect(page.getByTestId('current_url')).toHaveText('/')
  await expect(page.getByTestId('current_url_1')).toHaveText('/?book_param=1&das_ist=das_ist_string')
  await expect(page.getByTestId('current_url_2')).toHaveText('/')
  await expect(page.getByTestId('current_url_3')).toHaveText('/?string_param=params_some')

  await page.goto('/?string_param=params_some')
  await expect(page.getByTestId('search_params_str')).toHaveText('params_some')

  await page.goto('/some-random-page')
  
  await expect(page.getByTestId('current_url')).toHaveText('/some-random-page')
  await expect(page.getByTestId('current_url_1')).toHaveText('/some-random-page?book_param=1&das_ist=das_ist_string')
  await expect(page.getByTestId('current_url_2')).toHaveText('/some-random-page')
  await expect(page.getByTestId('current_url_3')).toHaveText('/some-random-page?string_param=params_some')
})

test('queryToSearchParams utility function', async () => {
  const result = queryToSearchParams({
    ww: ['a', 'b'],
    c: 'n',
    v: undefined
  })
  
  expect(result.toString()).toBe('ww=a&ww=b&c=n')
})
test('useParamState hook - URL state synchronization with debouncing', async ({ page }) => {
  await page.goto('/url-state-form')
  await expect(page).toHaveURL('/url-state-form')
  
  await page.getByTestId('form-input').pressSequentially('Hello World!', {
    delay: 100
  })

  await expect(
    page.getByTestId('url_change_time'),
    'No URL changes should occur while user is typing due to debouncing'
  ).toHaveText('0')
  
  await page.waitForTimeout(1000)
  
  await expect(
    page.getByTestId('url_change_time'),
    'Debounce callback should trigger when user stops typing'
  ).toHaveText('1')

  await page.waitForTimeout(1000)
  await expect(
    page.getByTestId('url_change_time'),
    'No additional updates should occur after debounce completes'
  ).toHaveText('1')

  const expectedUrl = new URLSearchParams()
  expectedUrl.set('url_change_test_input_value', 'Hello World!')
  await expect(page).toHaveURL('/url-state-form?' + expectedUrl.toString())

  await page.getByTestId('change_url_button').click()

  await expect(page).toHaveURL('/url-state-form?url_change_test_input_value=text_updated_from_external_router')
  await expect(
    page.getByTestId('form-input'),
    'Form input should sync with external URL changes'
  ).toHaveValue('text_updated_from_external_router')
})

test('linker',()=>{
  const ss = parseLink('/some-pathname?param1=1')
  const builder = createLinker(ss)
})