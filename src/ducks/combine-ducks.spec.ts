#!/usr/bin/env ts-node

import test  from 'tstest'

import { Duck } from '../duck/'

import { combineDucks } from './combine-ducks'

// import * as counterDuckAPI  from '../../examples/counter/'
import * as dingdongDuckAPI from '../../examples/ding-dong/'
// import * as pingpongDuckAPI from '../../examples/ping-pong/'

test('combineDucks()', async t => {
  // const counter  = new Duck(counterDuckAPI)
  const dingdong = new Duck(dingdongDuckAPI)
  // const pingpong = new Duck(pingpongDuckAPI)

  const tt = dingdong.api.default
  const ttt = dingdong.reducer

//   const tt: Reducer<{
//     dong: number;
// }>
  const reducer = combineDucks({
    dingdong,
    // pingpong,
    // counter,
  })

  t.ok(reducer, 'ft')
})
