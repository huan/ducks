import { API }  from './api'
import { Duck } from './duck'

export interface Ducksifiable <A extends API> {
  ducksify: () => Duck<A>
}
