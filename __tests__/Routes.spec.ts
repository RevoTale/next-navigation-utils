import {expect, test,} from '@playwright/test'

test('Test results',  async ({page}) => {

    expect(page.getByTestId('current_url'), '/')
    expect(page.getByTestId('current_url_1'), '/?book_param=1&das_ist=das_ist_string')
    expect(page.getByTestId('current_url_2'), '/')
    expect(page.getByTestId('current_url_3'), '/?string_param=params_some')


    await page.goto('/some-random-page')

    expect(page.getByTestId('current_url'), '/some-random-page')
    expect(page.getByTestId('current_url_1'), '/some-random-page?book_param=1&das_ist=das_ist_string')
    expect(page.getByTestId('current_url_2'), '/some-random-page')
    expect(page.getByTestId('current_url_3'), '/some-random-page?string_param=params_some')
})
