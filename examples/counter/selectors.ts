/**
 * CQRS - Command Query Responsibility Segregation
 *  https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs
 *
 *  `selectors` for Query
 *
 *  Define your Read Models and projection functions / query resolvers
 */
const getCounter = (state: { counter: number }) => () => state.counter

export {
  getCounter,
}
