import { Api }  from '../api'
import { Duck } from '../duck'

export interface Ducksifiable <A extends Api = any> {
  ducksify: () => Duck<A extends Api ? A : never>
}
