#!/usr/bin/env node -r ts-node/register
/**
 *   Ducks - https://github.com/huan/ducks
 *
 *   @copyright 2020 Huan LI (李卓桓) <https://github.com/huan>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
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
