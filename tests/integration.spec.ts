#!/usr/bin/env ts-node

import {
  test,
}             from 'tstest'

import {
  Ducks,
}                               from '../src/'

test('integration testing', async (t) => {
  const ducks = new Ducks()
  t.ok(ducks, 'to be writen')
})
