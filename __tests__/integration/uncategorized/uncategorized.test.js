'use strict'

const { resolve } = require('path')
const { URL } = require('url')
const fetch = require('node-fetch')
const { setup, teardown } = require('../_setupTeardown/index.js')

const { AWS_ENDPOINT } = process.env
const skip = AWS_ENDPOINT != null

jest.setTimeout(30000)

describe('uncategorized tests', () => {
  // init
  beforeAll(() =>
    setup({
      servicePath: resolve(__dirname),
      skip,
    }),
  )

  // cleanup
  afterAll(() => teardown({ skip }))

  const url = new URL(AWS_ENDPOINT || 'http://localhost:3000')

  // issue: https://github.com/dherault/serverless-offline/issues/756
  // PR: https://github.com/dherault/serverless-offline/pull/757
  test('Uncategorized 1', async () => {
    url.pathname = 'uncategorized-1'
    const response = await fetch(url)
    const json = await response.json()

    expect(json).toEqual({ foo: 'bar' })
  })

  // issue: https://github.com/dherault/serverless-offline/issues/758
  // PR: https://github.com/dherault/serverless-offline/pull/759
  test('Uncategorized 2', async () => {
    url.pathname = 'uncategorized-2'
    const response = await fetch(url)
    const json = await response.json()

    expect(json).toEqual({ foo: 'bar' })
  })
})
