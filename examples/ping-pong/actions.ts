import * as types from './types'

const ping = () => ({ type: types.PING })
const pong = () => ({ type: types.PING })

export {
  ping,
  pong,
}
