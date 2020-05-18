const getCounter       = (state: { total: number }) => () => state.total
const getMeaningOfLife = (_state: any) => (_: any) => 42

export {
  getCounter,
  getMeaningOfLife,
}
