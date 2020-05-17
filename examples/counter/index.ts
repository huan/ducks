import { combineReducers } from 'redux'

import { DuckAPI } from '../../src/'

import * as actions     from './actions'
import * as operations  from './operations'
import * as reducers    from './reducers'
import * as selectors   from './selectors'
import * as types       from './types'
import * as middlewares from './middlewares'

const reducer = combineReducers(reducers)

const duckAPI: DuckAPI = {
  actions,
  default: reducer,
  middlewares,
  operations,
  selectors,
  types,
}

export = duckAPI
