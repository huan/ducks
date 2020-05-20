#!/usr/bin/env ts-node

import test  from 'tstest'

import { reduceReducersFromMapObject } from './reduce-reducers-from-map-object'

test('reduceReducers()', async t => {
  t.ok(reduceReducersFromMapObject, 'tbw')
})
