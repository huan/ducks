# ducks

[![NPM Version](https://img.shields.io/npm/v/ducks?color=yellow)](https://www.npmjs.com/package/ducks)
[![NPM](https://github.com/huan/ducks/workflows/NPM/badge.svg)](https://github.com/huan/ducks/actions?query=workflow%3ANPM)

🦆🦆🦆 Ducks is A Redux Modular Proposal Implementation for Easily Managing and Using Your Ducks Reducer Bundle Packages.

![Ducks](https://huan.github.io/ducks/images/ducks.png)

> Image Credit: [Alamy](https://www.alamy.com/cute-duck-and-little-ducks-over-white-background-colorful-design-vector-illustration-image185379753.html)

[![Ducks Modular Proposal](https://img.shields.io/badge/Redux-Ducks-yellow)](https://github.com/erikras/ducks-modular-redux)
[![Re-Ducks Extended](https://img.shields.io/badge/Redux-Re--Ducks-orange)](https://github.com/alexnm/re-ducks)

Ducks offers a method of handling redux module packaging, installing, and running with your Redux store, with middware support. The goal of Ducks is to help you organizing your code for the long term.

> Java has jars and beans. Ruby has gems. I suggest we call these reducer bundles "ducks", as in the last syllable of "redux".  
> &mdash; Erik Rasmussen, 2015 ([link](https://github.com/erikras/ducks-modular-redux#name))

## Features

1. Implemented the specification from [Ducks Modular Proposal, Erik Rasmussen, 2015](https://github.com/erikras/ducks-modular-redux)
1. Easy connecting ducks to store by adding one enhancer to redux. (that's all you need to do!)
1. Fully typing with all APIs by TypeScript
1. Binding `store` to `operators` and `selectors` by currying for maximum convenience.

### Todo-list

- [ ] Ducks middleware support
- [ ] Provides a Ducks Management interface for:
  - [ ] adding/deleting a duck module

## Motivation

I'm building my redux ducks module for Wechaty Redux project and ...

## The Ducks Modular Proposal

[![Ducks Modular Proposal](https://img.shields.io/badge/Redux-Ducks-yellow)](https://github.com/erikras/ducks-modular-redux)

The specification has rules that a module...

1. MUST `export default` a function called `reducer()`
1. MUST `export` its action creators as functions
1. MUST have action types in the form `npm-module-or-app/reducer/ACTION_TYPE`
1. MAY export its action types as `UPPER_SNAKE_CASE`, if an external reducer needs to listen for them, or if it is a published reusable library

Here's the full version of Ducks proposal: [Redux Reducer Bundles, A proposal for bundling reducers, action types and actions when using Redux, Erik Rasmussen, 2015](https://github.com/erikras/ducks-modular-redux)

## Re-Ducks

[![Re-Ducks Extension](https://img.shields.io/badge/Redux-Re--Ducks-orange)](https://github.com/alexnm/re-ducks)

`Re-Ducks` is an extension to the original proposal for the ducks redux modular architecture.

By defining a ducks with duck folders instead of a duck file, it defines the **duck** folder would like:

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

> NOTE: Each concept from your app will have a similar folder.

### General rules for a duck folder

A duck folder:

1. MUST contain the **entire logic** for handling **only ONE** concept in your app, ex: product, cart, session, etc.
1. MUST have an `index.js` file that exports according to the original duck rules.
1. MUST keep code with similar purpose in the same file, ex: reducers, selectors, actions, etc.
1. MUST contain the **tests** related to the duck.

Here's the full version of Re-ducks proposal: [Building on the duck legacy, An attempt to extend the original proposal for redux modular architecture, Alex Moldovan, 2016](https://github.com/alexnm/re-ducks) and [blog](https://medium.com/better-programming/scaling-your-redux-app-with-ducks-6115955638be#.4ppptx7oq)

## Extensions

1. Perfrect TypeScript(v3.7) Typing Support powered by [typesafe-actions](https://github.com/piotrwitek/typesafe-actions).

1. selectors...: Currying a State
1. operators ...  Currying a Dispatch
1. namespaces...

1. sagas...
1. epics...

nesting ducks?

Ducks++ is to define a string constant inside the duck to determine where the state is stored in the store; 
[Ducks++: Redux Reducer Bundles, Djamel Hassaine, 2017](https://medium.com/@DjamelH/ducks-redux-reducer-bundles-44267f080d22)

## Requirements

1. Node.js v12+
1. Browsers

## Usage

### 1 The Duck API

```ts
export const types      = { TAP: 'ducks/examples/counter/TAP' }
export const actions    = { tap: () => ({ type: TAP }) }
export const operations = { tap: dispatch => dispatch(actions.tap()) }
export const selectors  = { getTotal: state => () => state.total }

const initialState = { total: 0 }
export default const reducer = (state = initialState, action) => {
  if (action.type === types.TAP) {
    return ({
      ...state,
      total: (state.total || 0) + 1,
    })
  }
}
```

### 2 Load Duck API to Ducks

```ts
import { Ducks, Duck }    from 'ducks'
import { CounterDuckAPI } from 'ducks/examples/counter/'

const counter = new Duck(CounterDuckAPI)
const ducks   = new Ducks({ counter })
```

### 3 Create Redux Store with Ducks

```ts
import { createStore } from 'redux'

const store = createStore(
  state => state,     // Your other reducers
  ducks.enhancer(),   // Add ducks to your store (that's all you need to do!)
)
```

You are set!

A full example that demostrate how to use Ducks can be found at [examples/quack.ts](examples/quack.ts), you can try it by running the following commands:

```sh
git clone git@github.com:huan/ducks.git
cd ducks
npm install
npm start
```

## API References


### 3.1 Shortcut to Configure the Store

If you only use Redux with Ducks, then you can use the shortcut from the Ducks to get the configured store:

```ts
const store = ducks.getStore()
```

The `ducks.getStore()` will do exact the same as the above `createStore()` codes.

## References

in `compose()`, `ducks.enhancer()` must be put before `applyMiddleware`

```ts
  ducks.enhancer(),
  applyMiddleware(
```

### `reduceReducersFromMapObject`


> We planed to directly use [reduce-reducers](https://github.com/redux-utilities/reduce-reducers) before, however it does not support types well.
> The `ReturnType` of it can not reflect the data type of the reducer returned state.

Inspired from <https://github.com/redux-utilities/reduce-reducers/>

Knowned Issues: <https://stackoverflow.com/a/44371190/1123955>

```ts
const addAndMult = reduceReducers(reducerAdd, reducerMult) 

const initial = addAndMult(undefined)
/*
 * {
 *   sum: 0,
 *   totalOperations: 0
 * }
 *
 * First, reducerAdd is called, which gives us initial state { sum: 0 }
 * Second, reducerMult is called, which doesn't have payload, so it
 * just returns state unchanged.
 * That's why there isn't any `product` prop.
 */
```



## Developing Tools

- [Typesafe utilities designed to reduce types verbosity and complexity in Redux Architecture](https://github.com/piotrwitek/typesafe-actions)
- [Conditional Type Checks](https://github.com/dsherret/conditional-type-checks)

## Links

- [Why I Chose to Modularize the Ducks in My React App // Lauren Lee // CascadiaJS 2018](https://www.youtube.com/watch?v=jr7D4VAzNig&t=960s)
- [Redux: Another implementation for Selector Pattern](https://stackoverflow.com/q/53265572/1123955)
- [Scaling your Redux App with ducks](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/)
- [Where do I put my business logic in a React-Redux application?](https://medium.com/@jeffbski/where-do-i-put-my-business-logic-in-a-react-redux-application-9253ef91ce1)
- [Redux Ecosystem Links - A categorized list of Redux-related addons, libraries, and utilities](https://github.com/markerikson/redux-ecosystem-links)

## Middlewares

- [ducksMiddleware - Extract all available middleware from a ducks object and creates a middleware with all available middleware.](https://github.com/drpicox/ducks-middleware)
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

### Sagas

- [This collection of common Redux-saga patterns will make your life easier.](https://medium.com/free-code-camp/redux-saga-common-patterns-48437892e11c)
- [Lost with Redux and sagas? Implement them yourself!](https://blog.castiel.me/posts/2019-08-03-lost-redux-saga-reimplement-them/)

## Relate Libraries

- [redux-operations - Solves challenging redux problems in a clean, understandable, debuggable fasion](https://github.com/mattkrick/redux-operations)
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
- [reduxModuleCreator - RMC is a tool for creating not coupled, reusable and testable modules based on Redux.](https://github.com/mtnt/reduxModuleCreator)

## Related Projects

- [redux-dynamic-middlewares - Allow add or remove redux middlewares dynamically](https://github.com/pofigizm/redux-dynamic-middlewares)

## Resources

- [Redux Ecosystem Links - A categorized list of addon libraries for Redux, as well as other libraries that are closely related](https://github.com/markerikson/redux-ecosystem-links)

## Concepts

Redux Ducks API compares with CQRS, Event Sourcing, and DDD:

| Ducks       | CQRS    | Event Sourcing | DDD  |
| :---        | :---    | :---           | :--- |
| actions     | Domain Aggregates with Command handlers
| - creator   | Command |
| - payload   | Event   | Event          |      |
| selectors   | Query   |
| operations  | Command + Event |
| middlewares | Aggregate? | Saga ? |
| types       | ??
| reducers    | Reducers to calculate Aggregate state

> [reSolve](https://reimagined.github.io/resolve/docs/introduction)

### DDD (Domain Driven Design)

Domain aggregate is a business model unit. Business logic is mostly in command handlers for the aggregate.

### ES (Event Sourcing()

Don't store system state, store events that brought system to this state.

### CQRS (Command Query Responsibility Segregation)


/**
 * CQRS - Command Query Responsibility Segregation
 *  https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs
 *
 *  1. `operations` for Command
 *  2. `selectors` for Query
 */

System is divided in two "sides":

- Write Side accepts commands and generate events that stored in the Event Store.
- Read Side applies events to Read Models, and process queries.

## History

### master

### v0.2 (May 2020)

Thanks [@gobwas](https://github.com/gobwas) for letting me use this great NPM module name `ducks` for my project, Appreciate it!

## Author

[Huan LI](https://github.com/huan) ([李卓桓](http://linkedin.com/in/zixia)) Microsoft Regional Director \<zixia@zixia.net\>

[![Profile of Huan LI (李卓桓) on StackOverflow](https://stackexchange.com/users/flair/265499.png)](https://stackexchange.com/users/265499)

## Copyright & License

- Code & Docs © 2020 Huan LI (李卓桓) \<zixia@zixia.net\>
- Code released under the Apache-2.0 License
- Docs released under Creative Commons
