import { API }  from './api'
import { Duck } from './duck'

export interface Ducksiable <A extends API> {
  ducksify: () => Duck<A>
}
