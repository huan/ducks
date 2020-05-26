import { API }  from './api'
import { Duck } from './duck'

export interface Ducksifiable <A extends API = API> {
  ducksify: () => Duck<A>
}