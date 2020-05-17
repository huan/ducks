# ducks

A Redux Reducer Bundles Manager for managing the modules that follows the Ducks Modular Proposal, by installing all ducks to the Redux with only one line of middleware.

![Ducks](docs/images/ducks.png)

> Image Credit: [Alamy](https://www.alamy.com/cute-duck-and-little-ducks-over-white-background-colorful-design-vector-illustration-image185379753.html)

Modular and Extensible Redux Reducer Bundles (ducks-modular-redux)

ducks is an implementation of the Ducks proposal.

ducks offers a method of handling redux module packaging.

## Features

1. Encapsulation in Redux
1. Plays nicely with Vanilla Redux
1. Perfrect TypeScript Typing Support powered by [typesafe-actions]().
1. Modulization Friendly
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
1. [Building on the duck legacy - An attempt to extend the original proposal for redux modular architecture](https://github.com/alexnm/re-ducks)
    - [Scaling Your Redux App with Ducks - Alex Moldovan - Medium Better Programming](https://medium.com/better-programming/scaling-your-redux-app-with-ducks-6115955638be#.4ppptx7oq)
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

## Ducks Directory

a duck:

MUST export default a function called reducer()
MUST export its action creators as functions
MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
MAY export its action types as UPPER_SNAKE_CASE, if an external reducer needs to listen for them, or if it is a published reusable library

Here's how a duck folder would look like:

```sh
duck/
├── actions.js
├── index.js
├── operations.js
├── reducers.js
├── selectors.js
├── tests.js
├── types.js
├── utils.js
```

A duck folder:

MUST contain the entire logic for handling only ONE concept in your app, ex: product, cart, session, etc.
MUST have an index.js file that exports according to the original duck rules.
MUST keep code with similar purpose in the same file, ex: reducers, selectors, actions, etc.
MUST contain the tests related to the duck.

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

## Relate Libraries

- [redux-operations - Solves challenging redux problems in a clean, understandable, debuggable fasion](https://github.com/mattkrick/redux-operations)
- [redux-dynamic-middlewares - Allow add or remove redux middlewares dynamically](https://github.com/pofigizm/redux-dynamic-middlewares)
- [redux-dynamic-modules - Modularize Redux by dynamically loading reducers and middlewares.](https://github.com/microsoft/redux-dynamic-modules)
- [Dynamically inject reducers in your react reduc app. HMR and SSR compatible.](https://github.com/GuillaumeCisco/redux-reducers-injector)
- [Helper for loading sagas asynchronously using redux](https://github.com/GuillaumeCisco/redux-sagas-injector)
- [💉 inject reducer and saga anywhere in the application.](https://github.com/marcelmokos/redux-inject-reducer-and-saga)
- [Paradux - a Redux reducer wrapper that adds a little bit of fun uncertainty](https://github.com/asteridux/paradux)
- [Allows dynamically injecting reducers into a redux store at runtime](https://github.com/randallknutson/redux-injector)
- [redux-optimistic-ui - a reducer enhancer to enable type-agnostic optimistic updates](https://github.com/mattkrick/redux-optimistic-ui)
- [Reduce Reducers - Reduce multiple reducers into a single reducer from left to right](https://github.com/redux-utilities/reduce-reducers)
- [Utilities that embrace best practices while working with redux in a universal application.](https://github.com/ImmoweltGroup/redux-lumbergh)
- [createReduxDuckling() to spawn Redux Ducks as unique child instances called Ducklings.](https://github.com/sammysaglam/redux-ducklings)
- [Modular and Extensible Redux Reducer Bundles (ducks-modular-redux)](https://github.com/investtools/extensible-duck)
- [Composable ducklings](https://github.com/pghalliday/redux-duckling)
- [Factory for simple creation and use of redux ducks.](https://github.com/espen42/duckfactory)
- [tiny-duck - Composable redux reducers](https://github.com/LockedOn/tiny-duck)

## Resources

- [Redux Ecosystem Links - A categorized list of addon libraries for Redux, as well as other libraries that are closely related](https://github.com/markerikson/redux-ecosystem-links)

## Concepts

Redux Ducks API compares with CQRS, Event Sourcing, and DDD:

| Ducks       | CQRS    | Event Sourcing | DDD  |
| :---        | :---    | :---           | :--- |
| actions     | --- 
| - creator   | Command |
| - payload   | Event   | Event          |      |
| selectors   | Query   |
| operations  | Command + Event |
| middlewares | Aggregate? | Saga ? |
| types       | ??
| reducers    | Aggregate??

> [reSolve](https://reimagined.github.io/resolve/docs/introduction)

### DDD (Domain Driven Design)

Domain aggregate is a business model unit. Business logic is mostly in command handlers for the aggregate.

### ES (Event Sourcing()

Don't store system state, store events that brought system to this state.

### CQRS (Command Query Responsibility Segregation)

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

[Huan LI](https://github.com/huan) ([李卓桓](http://linkedin.com/in/zixia)) Microsoft Regional Director \<zixia@zixia.net\>

[![Profile of Huan LI (李卓桓) on StackOverflow](https://stackexchange.com/users/flair/265499.png)](https://stackexchange.com/users/265499)

## Copyright & License

- Code & Docs © 2020-now Huan LI \<zixia@zixia.net\>
- Code released under the Apache-2.0 License
- Docs released under Creative Commons
