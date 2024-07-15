import {expect, test} from '@playwright/test'
import queryToSearchParams from "../src/queryToSearchParams"

test('Test results', async ({page}) => {
    await page.goto('/')
    await expect(page).toHaveURL('/')
    expect(await page.getByTestId('current_url').innerText(),).toBe('/')
    expect(await page.getByTestId('current_url_1').innerText(),).toBe('/?book_param=1&das_ist=das_ist_string')
    expect(await page.getByTestId('current_url_2').innerText(),).toBe('/')
    expect(await page.getByTestId('current_url_3').innerText(),).toBe('/?string_param=params_some')

    await page.goto('/?string_param=params_some')
    expect(await page.getByTestId('search_params_str').innerText(),).toBe('params_some')


    await page.goto('/some-random-page')

    expect(await page.getByTestId('current_url').innerText(),).toBe('/some-random-page')
    expect(await page.getByTestId('current_url_1').innerText(),).toBe('/some-random-page?book_param=1&das_ist=das_ist_string')
    expect(await page.getByTestId('current_url_2').innerText(),).toBe('/some-random-page')
    expect(await page.getByTestId('current_url_3').innerText(),).toBe('/some-random-page?string_param=params_some')

    expect(queryToSearchParams({
        ww: ['a', 'b'],
        c: 'n',
        v: undefined
    }).toString()).toBe('ww=a&ww=b&c=n')
})
