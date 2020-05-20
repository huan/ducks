import { Store } from 'redux'

import { VERSION } from './version'

const TMP_STORE = {
  dispatch: () => { throw new Error('not initialized...') },
  getState: () => { throw new Error('not initialized...') },
} as any as Store

const DUCKS_NAMESPACE = 'ducks'

export {
  DUCKS_NAMESPACE,
  TMP_STORE,
  VERSION,
}
