import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import LambdaFunction from '../../../LambdaFunction.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default class LambdaFunctionThatReturnsJSONObject {
  options = {}

  serverless = {
    config: {
      serverlessPath: '',
      servicePath: resolve(__dirname),
    },
    service: {
      provider: {
        runtime: 'nodejs12.x',
      },
    },
  }

  listFunctionNames() {
    return ['foo']
  }

  getByFunctionName(functionName) {
    const functionDefinition = {
      handler:
        '../../fixtures/lambdaFunction.fixture.asyncFunctionHandlerObject',
    }

    return new LambdaFunction(
      functionName,
      functionDefinition,
      this.serverless,
      this.options,
    )
  }
}
