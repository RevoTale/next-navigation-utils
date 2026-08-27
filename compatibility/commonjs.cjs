// biome-ignore-all lint/correctness/noNodejsModules: This smoke test runs in Node.
'use strict'

const assert = require('node:assert/strict')

const library = require('next-navigation-utils')
const client = require('next-navigation-utils/client')
const parameters = require('next-navigation-utils/parameters')

assert.equal(typeof library.getQueryParamValue, 'function')
assert.equal(typeof client.useParamState, 'function')
assert.equal(typeof parameters.stringType, 'object')
