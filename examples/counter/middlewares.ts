import { Middleware } from 'redux'

// FIXME
const middleware1: Middleware = _api => next => action => next(action)

export {
  middleware1,
}
