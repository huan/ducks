import assert from 'assert'

import {
  ActionCreator,
  AnyAction,
  Reducer,
}                 from 'redux'

import { DuckAPI } from './duck-api'

export interface MapObject {
  [key: string]: any,
}

/**
 * Huan(202005) TODO:
 *  Testing static types in TypeScript
 *    https://2ality.com/2019/07/testing-static-types.html
 *
 * use tsd? tsdlint?
 *
 * To be added in the future:
 *  1. check selectors take a state as argument and returns a function
 *  2. check operations take a store as argument and returns a frunction
 *  3. Conditional Type Checks - https://github.com/dsherret/conditional-type-checks
 */

function validateDuckAPI <T extends DuckAPI> (api: T) {
  validateActions(api.actions)
  validateOperations(api.operations)
  validateReducer(api.default)
  validateSelectors(api.selectors)
  validateTypes(api.types)
}

/**
 *
 * Sub Validating Functions
 *
 */
function validateReducer <T extends Reducer> (reducer: T) {
  assert.strictEqual(typeof reducer, 'function', 'default export should be function')
  assert.strictEqual(reducer.length, 2, 'reducer should has two arguments')
}

function validateActions <T extends MapObject> (actions: T) {
  assert.ok(actions, 'should exported actions')
  Object.keys(actions).forEach(validateString)
  Object.values(actions).forEach(validateActionType)
}

function validateOperations <T extends MapObject> (operations: T) {
  assert.ok(operations, 'should exported operations')
  Object.keys(operations).forEach(validateString)
  Object.values(operations).forEach(validateOperationParameterType)
}

function validateSelectors <T extends MapObject> (selectors: T) {
  assert.ok(selectors, 'should exported selectors')
  Object.keys(selectors).forEach(validateString)
  Object.values(selectors).forEach(validateSelectorParameterType)
}

function validateTypes <T extends MapObject> (types: T) {
  assert.ok(types, 'should exported types')
  Object.keys(types).forEach(validateString)
  Object.values(types).forEach(validateString)
}

/**
 *
 * Helper Functions
 *
 */
function validateString (value: any) {
  assert.strictEqual(typeof value, 'string', 'should be string type: ' + value)
}

function validateActionType (actionCreator: ActionCreator<AnyAction>) {
  assert.strictEqual(typeof actionCreator, 'function', 'actionCreator should be a function')
}

function validateSelectorParameterType (selector: (...args: any[]) => any) {
  assert.strictEqual(typeof selector, 'function', 'selector should be a function')
}

function validateOperationParameterType (operation: (...args: any[]) => any) {
  assert.strictEqual(typeof operation, 'function', 'operation should be a function')
}

export {
  validateDuckAPI,
}
