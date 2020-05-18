import * as actions     from './actions'
import * as operations  from './operations'
import * as selectors   from './selectors'
import * as types       from './types'

import reducer from './reducers'

const namespace = 'counter'

export {
  actions,
  namespace,
  operations,
  selectors,
  types,
}

export default reducer
