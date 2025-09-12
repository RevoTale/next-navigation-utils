import { expect, test } from '@playwright/test'
import { createLinkerUrl, parseLink, createLinker, queryToSearchParams } from '../src/index'
import parseRelativeLink from '../src/utils/parseRelativeLink'

test('URL parameter handling and linker functionality', async ({ page }) => {

  await page.goto('/')
  await expect(page).toHaveURL('/')
  
  await expect(page.getByTestId('current_url')).toHaveText('/')
  await expect(page.getByTestId('current_url_1')).toHaveText('/?book_param=1&das_ist=das_ist_string')
  await expect(page.getByTestId('current_url_2')).toHaveText('/')
  await expect(page.getByTestId('current_url_3')).toHaveText('/?string_param=params_some')

  await page.goto('/?string_param=params_some')
  await expect(page.getByTestId('search_params_str')).toHaveText('params_some')

  await page.goto('/some-random-page')
  await expect(page).toHaveURL('/some-random-page')
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
  page.on('console', msg => console.log(msg.text()));
  
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
    await expect(
    page.getByTestId('form-input'),
    'Input value is the same as typed'
  ).toHaveValue('Hello World!',{
    timeout: 3000
  })

  await page.getByTestId('change_url_button').click()

  await expect(page).toHaveURL('/url-state-form?url_change_test_input_value=text_updated_from_nextjs_router')

  await expect(
    page.getByTestId('form-input'),
    'Form input should sync with Next.js router URL changes'
  ).toHaveValue('text_updated_from_nextjs_router',{
    timeout: 3000
  })

    await page.goto('/url-state-form?url_change_test_input_value=text_updated_from_browser_router')
    await expect(page).toHaveURL('/url-state-form?url_change_test_input_value=text_updated_from_browser_router')
    
    await expect(
      page.getByTestId('form-input'),
      'Form input should sync with browser API URL changes'
    ).toHaveValue('text_updated_from_browser_router',{
      timeout: 3000
    })

    //Test value change middleware
        await expect(page.getByTestId('page_value')).toHaveText('1')

    await page.getByTestId('next_page').click()
    await expect(page.getByTestId('page_value')).toHaveText('2')
        await page.getByTestId('form-input').pressSequentially('not trigger page reset')
            await expect(page.getByTestId('page_value')).toHaveText('2')

    await page.waitForTimeout(1200)

    await page.getByTestId('toggle_page_reset').click()
    await expect(page.getByTestId('page_reset_active')).toHaveText('Page reset active')
    await page.getByTestId('form-input').pressSequentially('trigger page reset')
    await page.waitForTimeout(1200)
    await expect(page.getByTestId('page_value')).toHaveText('1')
})

test('linker',    ()=>{
  const ss = parseLink('/some-pathname?param1=1')
  if (ss instanceof URL) {
    throw new Error('The link is URL')
  }
  const builder = createLinker(ss)
   expect(builder.asString()).toBe('/some-pathname?param1=1')
    expect(builder.getLink()).toEqual(ss)

    expect(parseRelativeLink('/some-pathname?param1=1').asString()).toEqual(ss.asString())
    expect(() => parseRelativeLink('https://example.com/some-pathname?param1=1')).toThrowError('The link is URL')
    expect(() => parseRelativeLink('ftp://example.com/some-pathname?param1=1')).toThrowError('The link is URL')
    expect(parseRelativeLink('ss/dd').asString()).toBe('/ss/dd')
     expect(parseRelativeLink('').asString()).toBe('/')
})
