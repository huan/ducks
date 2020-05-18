import assert from 'assert'

import { DuckAPI } from './duck-api'

/**
 * TODO:
 *  1. check selectors take a state as argument and returns a function
 *  2. check operations take a store as argument and returns a frunction
 */
function validateDuckAPI (api: DuckAPI) {
  assert.strictEqual(typeof api.default, 'function', 'default export should be the reducer function')

  assert.ok(api.actions,    'should has exported actions')
  assert.ok(api.operations, 'should has exported operations')
  assert.ok(api.selectors,  'should has exported selectors')
  assert.ok(api.types,      'should has exported types')

  ;[
    ...Object.values(api.actions),
    ...Object.values(api.operations),
    ...Object.values(api.selectors),
  ].forEach(value => assert.strictEqual(typeof value, 'function', 'actions/operations/selectors should has exported function values'))

  Object.values(api.types).forEach(value => assert.strictEqual(typeof value, 'string', 'types should has exported string values'))

  // assert.ok(api.middlewares, 'should has exported middlewares')

  /**
   * Ducks Pruposal Extension
   */
  assert.ok(api.namespace, 'should has exported namespace')
  assert.strictEqual(typeof api.namespace, 'string', 'namespace should have string type')
}

export {
  validateDuckAPI,
}
