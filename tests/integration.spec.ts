#!/usr/bin/env ts-node

import {
  test,
}             from 'tstest'

import {
  Ducks,
}                               from '../src/'

test('integration testing', async (t) => {
  t.ok(Ducks.VERSION, 'to be writen')
})
