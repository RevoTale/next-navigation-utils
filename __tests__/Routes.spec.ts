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
test('URL state syncroniztion', async ({page})=>{
    await page.goto('/url-state-form')
    await expect(page).toHaveURL('/url-state-form')
    await page.locator('#form-input').pressSequentially('Hello World!',{
        delay: 100
    });

    expect(await page.getByTestId('url_change_time').innerText(),'No changes commited while user is typing').toBe('0')
    await (new Promise(resolve => setTimeout(resolve, 1000)));
    expect(await page.getByTestId('url_change_time').innerText(),'Debounce callback was called when user has enough gap between keyboard pressing').toBe('1')

    await (new Promise(resolve => setTimeout(resolve, 1000)));
    expect(await page.getByTestId('url_change_time').innerText(),'No redundant updates triggered twice').toBe('1')
    
    // URLSearchParams uses form encoding where spaces become + instead of %20
    const expectedUrl = new URLSearchParams();
    expectedUrl.set('url_change_test_input_value', 'Hello World!');
    await expect(page).toHaveURL('/url-state-form?' + expectedUrl.toString())

    await page.getByTestId('change_url_button').click()

    await expect(page).toHaveURL('/url-state-form?url_change_test_input_value=text_updated_from_external_router')
    expect(await page.getByTestId('form-input').inputValue(),'Input values is in sync with the external URL changes').toBe('text_updated_from_external_router')
})