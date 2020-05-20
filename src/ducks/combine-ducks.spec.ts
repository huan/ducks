#!/usr/bin/env ts-node

/**
 *   Ducks - https://github.com/huan/ducks
 *
 *   @copyright 2020 Huan LI (李卓桓) <https://github.com/huan>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
import test  from 'tstest'

import { Duck } from '../duck/'

import { combineDucks } from './combine-ducks'

import * as counterDuckAPI  from '../../examples/counter/'
import * as dingdongDuckAPI from '../../examples/ding-dong/'
import * as pingpongDuckAPI from '../../examples/ping-pong/'

test('combineDucks()', async t => {
  const counter  = new Duck(counterDuckAPI)
  const dingdong = new Duck(dingdongDuckAPI)
  const pingpong = new Duck(pingpongDuckAPI)

  // const tt = dingdong.api.default
  // const ttt = dingdong.reducer

  // const tt: Reducer<{
  //   dong: number;
  // }>
  const reducer = combineDucks({
    counter,
    dingdong,
    pingpong,
  })

  t.ok(reducer, 'ft')
})
