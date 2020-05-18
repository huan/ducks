#!/usr/bin/env node -r ts-node/register
import { test } from 'tstest'

import configureMockStore  from 'redux-mock-store'
import {
  createEpicMiddleware,
  combineEpics,
}                         from 'redux-observable'

import {
  validateDuckAPI,
}                     from '../../src'

import * as api from '.'

validateDuckAPI(api)

test('ding -> dong', async t => {
  const epicMiddleware = createEpicMiddleware()
  /**
   * https://redux.js.org/recipes/writing-tests#async-action-creators
   */
  const mockStore = configureMockStore([epicMiddleware])

  const expectedActions = [
    { type: api.types.DING },
    { type: api.types.DONG },
  ]
  const store = mockStore()

  epicMiddleware.run(combineEpics(
    ...Object.values(api.epics)
  ))

  store.dispatch(api.actions.ding())

  t.deepEqual(store.getActions(), expectedActions, 'should get the DONG after DING')
})
