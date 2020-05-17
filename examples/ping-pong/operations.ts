import { Store } from 'redux'

import * as actions from './actions'

const ping = ({ dispatch }: Store) => () => dispatch(actions.ping())

export {
  ping,
}
