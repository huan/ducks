#!/usr/bin/env ts-node

import { test } from 'tstest'

import {
  combineReducers,
  createStore,
}                       from 'redux'
import createMockStore from 'redux-mock-store'

import * as counterDuckAPI from '../examples/counter/'

import { Duck } from './duck'

test('setStore()', async (t) => {
  const duck = new Duck(counterDuckAPI)

  const store = createMockStore()()

  t.throws(() => duck.selectors.getMeaningOfLife(42), 'should throw before setStore()')

  duck.setStore(store)
  t.doesNotThrow(() => duck.selectors.getMeaningOfLife(42), 'should not throw after setStore()')

  t.strictEqual(duck.store, store, 'should set to store')
})

test("ducksify functions' names", async t => {
  /**
   * Inferred function names
   *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
   */
  const duck = new Duck(counterDuckAPI)

  Object.keys(counterDuckAPI.selectors).forEach(selector => {
    const duckSelectorsFunc = duck.selectors[selector as keyof typeof duck.selectors]
    const apiSelectorsFunc  = counterDuckAPI.selectors[selector as keyof typeof duck.selectors]

    t.equals(
      duckSelectorsFunc.name,
      apiSelectorsFunc.name,
      'selectors function name should keep the same after ducksify',
    )
  })
})

test('ducksified selectors & operations', async t => {
  const duck = new Duck(counterDuckAPI)

  const reducer = combineReducers({
    [duck.namespace]: duck.reducer,
  })
  const store = createStore(reducer)

  duck.setStore(store)
  // store.subscribe(() => {
  //   console.info('store.subscribe() store.getState()', store.getState())
  // })

  let counter = duck.selectors.getCounter()
  t.equal(counter, 0, 'should be 0 before initialized')

  duck.operations.tap()
  counter = duck.selectors.getCounter()
  t.equal(counter, 1, 'should be 1 after tap')
})
