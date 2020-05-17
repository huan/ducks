import {
  Epic,
  ofType,
}             from 'redux-observable'

import {
  mapTo,
}             from 'rxjs/operators'

import * as actions from './actions'
import * as types   from './types'

const dingEpic: Epic = action$ => action$.pipe(
  ofType(types.DING),
  mapTo(actions.dong()),
)

export {
  dingEpic,
}
