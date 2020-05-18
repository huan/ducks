#!/usr/bin/env node -r ts-node/register
import { test } from 'tstest'

import configureMockStore   from 'redux-mock-store'
import createSagaMiddleware from 'redux-saga'
import {
  all,
}         from 'redux-saga/effects'

import {
  validateDuckAPI,
}                     from '../../src'

import * as api from '.'

validateDuckAPI(api)

test('ping -> pong', async t => {
  const sagaMiddleware = createSagaMiddleware()
  /**
   * https://redux.js.org/recipes/writing-tests#async-action-creators
   */
  const mockStore = configureMockStore([sagaMiddleware])
  const store = mockStore({})

  function * rootSaga () {
    yield all(
      Object.values(api.sagas)
        .map(saga => saga())
    )
  }

  sagaMiddleware.run(rootSaga)

  const expectedActions = [
    { type: api.types.PING },
    { type: api.types.PONG },
  ]

  store.dispatch(api.actions.ping())

  t.deepEqual(store.getActions(), expectedActions, 'should get the PONG after PING')
})
