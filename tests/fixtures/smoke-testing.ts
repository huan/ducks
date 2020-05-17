#!/usr/bin/env ts-node
import {
  Ducks,
  VERSION,
}                       from 'ducks'

async function main () {
  if (VERSION === '0.0.0') {
    throw new Error('version should be set before publishing')
  }

  const ducks = new Ducks()
  const version = ducks.version()

  return 0
}

main()
  .then(process.exit)
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
