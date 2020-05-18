import * as actions     from './actions'
import * as operations  from './operations'
import * as selectors   from './selectors'
import * as types       from './types'
import * as sagas       from './sagas'

import reducer from './reducers'

const namespace = 'ping-pong'

export {
  actions,
  namespace,
  operations,
  sagas,
  selectors,
  types,
}

export default reducer
