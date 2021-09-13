import InvocationsController from '../../../routes/invocations/InvocationsController.js'
import LambdaFunctionThatReturnsJSONObject from '../../fixtures/Lambda/LambdaFunctionThatReturnsJSONObject.fixture.js'
import LambdaFunctionThatReturnsNativeString from '../../fixtures/Lambda/LambdaFunctionThatReturnsNativeString.fixture.js'

jest.mock('../../../../serverlessLog')

describe('InvocationController', () => {
  const functionName = 'foo'

  describe('when event type is "RequestResponse"', () => {
    const eventType = 'RequestResponse'

    test('should return json object if lambda response is json', async () => {
      const expected = {
        Payload: {
          foo: 'bar',
        },
        StatusCode: 200,
      }

      const invocationController = new InvocationsController(
        new LambdaFunctionThatReturnsJSONObject(),
      )
      const result = await invocationController.invoke(functionName, eventType)

      expect(result).toStrictEqual(expected)
    })

    test('should wrap native string responses with ""', async () => {
      const expected = {
        Payload: '"foo"',
        StatusCode: 200,
      }

      const invocationController = new InvocationsController(
        new LambdaFunctionThatReturnsNativeString(),
      )
      const result = await invocationController.invoke(functionName, eventType)

      expect(result).toStrictEqual(expected)
    })
  })
})
