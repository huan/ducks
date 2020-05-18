/**
 * CQRS - Command Query Responsibility Segregation
 *  https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs
 *
 *  `selectors` for Query
 *
 *  Define your Read Models and projection functions / query resolvers
 */
const getCounter       = (state: { total: number }) => () => state.total
const getMeaningOfLife = (_state: any) => (_: any) => 42

export {
  getCounter,
  getMeaningOfLife,
}
