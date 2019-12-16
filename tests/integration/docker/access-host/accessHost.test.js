import { platform } from 'os'
import { resolve } from 'path'
import { Server } from '@hapi/hapi'
import fetch from 'node-fetch'
import { joinUrl, setup, teardown } from '../../_testHelpers/index.js'

jest.setTimeout(120000)

describe('Access host with Docker tests', () => {
  let server

  if (!process.env.DOCKER_DETECTED) {
    test.only("Could not find 'Docker' executable, skipping 'Docker' tests.", () => {})
  } else {
    // init
    beforeAll(async () => {
      server = new Server({ port: 8080 })
      server.route({
        method: 'GET',
        path: '/hello',
        handler: () => {
          return 'Hello Node.js!'
        },
      })

      await server.start()

      return setup({
        servicePath: resolve(__dirname),
        args: ['--host-os', platform()],
      })
    })

    // cleanup
    afterAll(async () => {
      await server.stop()
      return teardown()
    })
  }

  //
  ;[
    {
      description: 'should access host in docker container',
      expected: {
        message: 'Hello Node.js!',
      },
      path: '/hello',
    },
  ].forEach(({ description, expected, path }) => {
    test(description, async () => {
      const url = joinUrl(TEST_BASE_URL, path)
      const response = await fetch(url)
      const json = await response.json()

      expect(json).toEqual(expected)
    })
  })
})
