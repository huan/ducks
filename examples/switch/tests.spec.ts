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

test('toggle', async t => {
  const store = createStore(api.default)

  let s = api.selectors.getState(store.getState())()
  t.equal(s, false, 'should be false after init')

  store.dispatch(api.actions.toggle())

  s = api.selectors.getState(store.getState())()
  t.equal(s, true, 'should be true after toggle')
})
