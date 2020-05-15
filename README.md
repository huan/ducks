# ducks

A Redux Reducer Bundles Manager for managing the modules that follows the Ducks Modular Proposal, by installing all ducks to the Redux with only one line of middleware.

![Ducks](docs/images/ducks.png)

> Image source: [PNG BARN](https://www.pngbarn.com/png-image-biwfd)

## Features

1. Provide TypeScript Interface for Ducks Modular Proposal
1. ActionBinding & SelectorBinding for making non-store & non-mount-point usage with convenience
    1. namespaces auto-management
1. Provide a Ducks Management interface for adding/deleting duck modules
1. Easy to be integrated with naive Redux by adding only one middleware for all ducks.
1. Support using any middleware inside a duck module
1. Make Ducks Modular Proposal to be easy management
1. Support both Frontend & Backend

## Motivation

## Princples

1. [Ducks: Redux Reducer Bundles - A proposal for bundling reducers, action types and actions when using Redux](https://github.com/erikras/ducks-modular-redux)
1. [Ducks++: Redux Reducer Bundles](https://medium.com/@DjamelH/ducks-redux-reducer-bundles-44267f080d22)

## Usage

### 1 Create a Modular Ducks (Redux Reducer Bundle)

```ts
export const types = {
  TAP:    'ducks/examples/counter/TAP',
  RESET:  'ducks/examples/counter/RESET',
}

export const actions = {
  tap: () => ({ type: TAP }),
  reset: () => ({ type: RESET })
}

/**
 * CQRS - Command Query Responsibility Segregation
 *  https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs
 *
 *  1. `operations` for Command
 *  2. `selectors` for Query
 */
export const operations = {
  reset: ({ dispatch }) => dispatch(actions.reset())
}

export const selectors = {
  counter: state => () => state.counter,
}

export default const reducer = (state = {}, action) => {
  if (action.type === types.TAP) {
    return ({
      ...state,
      counter: (state.counter || 0) + 1,
    })
  }
}
```

### 2 Load Ducks

```ts
import { Ducks, Duck } from 'ducks'

import { CounterDuck }  from 'ducks/examples/counter/'

const counterDuck = new Duck(CounterDuck)
const finisDuck = new Duck(FinisDuck)

const ducks = new Ducks({
  ducks: [
    counterDuck,
    finisDuck,
  ],
})
```

### 3 Setup Redux with Ducks

```ts
import { createStore, applyMiddleWare } from 'redux'

const initialState = {}
const store = createStore(
  ducks.reducer,
  initialState,
  applyMiddleWare(ducks.middleware),
)
```

You are set!

### 3.1 Shortcut to Configure the Store

If you only use Redux with Ducks, then you can use the shortcut from the Ducks to get the configured store:

```ts
const store = ducks.getStore()
```

The `ducks.getStore()` will do exact the same as the above `createStore()` codes.

## Developing Tools

- [Typesafe utilities designed to reduce types verbosity and complexity in Redux Architecture](https://github.com/piotrwitek/typesafe-actions)

## Links

- [Why I Chose to Modularize the Ducks in My React App // Lauren Lee // CascadiaJS 2018](https://www.youtube.com/watch?v=jr7D4VAzNig&t=960s)
- [Redux: Another implementation for Selector Pattern](https://stackoverflow.com/q/53265572/1123955)
- [Scaling your Redux App with ducks](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/)
- [Where do I put my business logic in a React-Redux application?](https://medium.com/@jeffbski/where-do-i-put-my-business-logic-in-a-react-redux-application-9253ef91ce1)
- [Redux Ecosystem Links - A categorized list of Redux-related addons, libraries, and utilities](https://github.com/markerikson/redux-ecosystem-links)

## Middlewares

- [Exploring Redux middleware - Nine simple stand-alone experiments to understand Redux Middlewares](https://blog.krawaller.se/posts/exploring-redux-middleware/)
- [Redux Middleware Lifecycle - Impure and asynchronous; but still redux](https://hackernoon.com/
- [Understanding Redux Middleware](https://medium.com/@meagle/understanding-87566abcfb7a)
- [You Aren’t Using Redux Middleware Enough](https://medium.com/@jacobp100/you-arent-using-redux-middleware-enough-94ffe991e6)
- [redux-dynamic-middlewares - Allow add or remove redux middlewares dynamically](https://github.com/pofigizm/redux-dynamic-middlewares)

## Articles

- [Modular Reducers and Selectors](https://randycoulman.com/blog/2016/09/27/modular-reducers-and-selectors/)
- [Idiomatic Redux: Thoughts on Thunks, Sagas, Abstraction, and Reusability](https://blog.isquaredsoftware.com/2017/01/idiomatic-redux-thoughts-on-thunks-sagas-abstraction-and-reusability/)
redux-middleware-lifecycle-7d8defa4db7e)
- [reSolve - A Redux-Inspired Backend](https://medium.com/resolvejs/resolve-redux-backend-ebcfc79bbbea)

## Libraries

- [redux-dynamic-middlewares - Allow add or remove redux middlewares dynamically](https://github.com/pofigizm/redux-dynamic-middlewares)
- [redux-dynamic-modules - Modularize Redux by dynamically loading reducers and middlewares.](https://github.com/microsoft/redux-dynamic-modules)

## Resources

- [Redux Ecosystem Links - A categorized list of addon libraries for Redux, as well as other libraries that are closely related](https://github.com/markerikson/redux-ecosystem-links)

## Concepts

> [reSolve](https://reimagined.github.io/resolve/docs/introduction)

### Domain Driven Design

Domain aggregate is a business model unit. Business logic is mostly in command handlers for the aggregate.

### Event Sourcing

Don't store system state, store events that brought system to this state.

### CQRS

System is divided in two "sides":

- Write Side accepts commands and generate events that stored in the Event Store.
- Read Side applies events to Read Models, and process queries.

## Related Projects

- [reduxModuleCreator - RMC is a tool for creating not coupled, reusable and testable modules based on Redux.](https://github.com/mtnt/reduxModuleCreator)

## History

### master

### v0.2 (May 2020)

Thanks [@gobwas](https://github.com/gobwas) for letting me use this great NPM module name `ducks` for my project, Appreciate it!

## Author

[Huan LI](https://github.com/huan) ([李卓桓](http://linkedin.com/in/zixia)) zixia@zixia.net

[![Profile of Huan LI (李卓桓) on StackOverflow](https://stackexchange.com/users/flair/265499.png)](https://stackexchange.com/users/265499)

## Copyright & License

- Code & Docs © 2020-now Huan LI \<zixia@zixia.net\>
- Code released under the Apache-2.0 License
- Docs released under Creative Commons
