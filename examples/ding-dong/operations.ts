import { Store } from 'redux'

import * as actions from './actions'

const ding = ({ dispatch }: Store) => () => dispatch(actions.ding())

export {
  ding,
}
