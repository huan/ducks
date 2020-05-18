import assert from 'assert'

import { DuckAPI } from './duck-api'

function validateDuckApi (api: DuckAPI) {
  console.info('validating duck apis ...')

  assert.strictEqual(typeof api.default, 'function', 'default export should be the reducer function')

  assert.ok(api.actions,    'should has actions')
  assert.ok(api.operations, 'should has operations')
  assert.ok(api.selectors,  'should has selectors')
  assert.ok(api.types,      'should has types')

  ;[
    ...Object.values(api.actions),
    ...Object.values(api.operations),
    ...Object.values(api.selectors),
  ].forEach(value => assert.strictEqual(typeof value, 'function', 'actions/operations/selectors should has function values'))

  Object.values(api.types).forEach(value => assert.strictEqual(typeof value, 'string', 'types should has string values'))

  // assert.ok(api.middlewares, 'should has middlewares')

  /**
   * Ducks Pruposal Extension
   */
  assert.ok(api.namespace, 'should has namespace')
  assert.strictEqual(typeof api.namespace, 'string', 'namespace should have string type')

  console.info('validated: OK')
}

export {
  validateDuckApi,
}
