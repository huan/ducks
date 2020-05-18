import { Store } from 'redux'

import * as actions from './actions'

const tap = ({ dispatch }: Store) => () => dispatch(actions.tap())

export {
  tap,
}
