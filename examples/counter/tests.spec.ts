#!/usr/bin/env node -r ts-node/register
import { test } from 'tstest'

import {
  createStore,
}                         from 'redux'

import {
  validateDuckAPI,
}                     from '../../src'

import * as api from '.'

validateDuckAPI(api)

test('counter', async t => {
  const store = createStore(api.default)

  let n = api.selectors.getCounter(store.getState())()
  t.equal(n, 0, 'should be 0 after init')

  store.dispatch(api.actions.tap())

  n = api.selectors.getCounter(store.getState())()
  t.equal(n, 1, 'should be 1 after tap')
})

test('operations', async t => {
  const store = createStore(api.default)

  api.operations.tap(store.dispatch)()

  const n = api.selectors.getCounter(store.getState())()
  t.equal(n, 1, 'should be 1 after operations.tap(store)()')
})
