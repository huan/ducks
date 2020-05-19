import { Dispatch } from 'redux'

import * as actions from './actions'

const ping = (dispatch: Dispatch) => () => dispatch(actions.ping())

export {
  ping,
}
