/**
 * https://redux.js.org/glossary#store-enhancer
 */
import {
  // StoreCreator,
  StoreEnhancer,
}                     from 'redux'

const ducksEnhancer: StoreEnhancer = next => {
  return next
}

export {
  ducksEnhancer,
}
