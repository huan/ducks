#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
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
import {
  Duck,
  Ducks,
  VERSION,
}                     from 'ducks'

import * as counterDuck from './counter/mod.js'

async function main () {
  const ducks = new Ducks({ counter: counterDuck })
  ducks.configureStore()

  if (VERSION === '0.0.0') {
    throw new Error('version should be set before publishing')
  }

  return 0
}

main()
  .then(process.exit)
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
