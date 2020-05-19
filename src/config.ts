import { Store } from 'redux'

const TMP_STORE = {
  dispatch: () => { throw new Error('not initialized...') },
  getState: () => { throw new Error('not initialized...') },
} as any as Store

export {
  TMP_STORE,
}
