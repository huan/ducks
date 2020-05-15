/**
 * CQRS - Command Query Responsibility Segregation
 *  https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs
 *
 *  `selectors` for Query
 *
 *  Define your Read Models and projection functions / query resolvers
 */
const counter = state => () => state.counter

export {
  counter,
}
