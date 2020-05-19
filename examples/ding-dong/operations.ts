import { Dispatch } from 'redux'

import * as actions from './actions'

const ding = (dispatch: Dispatch) => () => dispatch(actions.ding())

export {
  ding,
}
