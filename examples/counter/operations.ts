import { Dispatch } from 'redux'

import * as actions from './actions'

const tap = (dispatch: Dispatch) => () => dispatch(actions.tap())

export {
  tap,
}
