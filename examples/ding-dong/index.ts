import { reduceReducers } from '../../src/'

import * as actions     from './actions'
import * as epics       from './epics'
import * as operations  from './operations'
import * as selectors   from './selectors'
import * as types       from './types'

import * as reducers    from './reducers'

const reducer = reduceReducers(
  Object.values(reducers),
)

const namespace = 'ding-dong'

export {
  actions,
  epics,
  namespace,
  operations,
  selectors,
  types,
}

export default reducer
