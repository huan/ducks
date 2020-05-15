import { DuckAPI } from '../../src/'

import * as actions     from './actions'
import * as operations  from './operations'
import * as selectors   from './selectors'
import * as types       from './types'

import reducer from './reducer'

const middleware = () => {}

export <DuckAPI>{
  actions,
  default: reducer,
  middleware,
  operations,
  selectors,
  types,
}

export default reducer
