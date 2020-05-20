const getState = (state: { state: boolean }) => () => state.state

export {
  getState,
}
