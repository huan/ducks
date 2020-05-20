import { Dispatch } from 'redux'

import * as actions from './actions'

const toggle = (dispatch: Dispatch) => () => dispatch(actions.toggle())

export {
  toggle,
}
