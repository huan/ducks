import { DuckAPI } from './duck-api'

class Duck <API extends DuckAPI> {

  public namespace: string

  get actions ()  { return this.api.actions }
  get types ()    { return this.api.types }

  get epics () { return this.api.epics }
  get sagas () { return this.api.sagas }

  get operators () {
    return this.api.operations
  }

  get selectors <S extends API[selectors]> () {
    return this.api.selectors
  }

  constructor (
    public api: API,
    namespace?: string,
  ) {

    /**
     * The namespace is the mount point of the state.
     *
     * It will be decided by following the below steps:
     *  1. Override by constructor: namespace in constructor arguments
     *  2. The default: namespace in api.namespace
     *  3. Given one: a random string will be used.
     */
    if (namespace) {
      this.namespace = namespace
    } else if (api.namespace) {
      this.namespace = api.namespace
    } else {
      // a random string sill be used for the namespace (mount ponit)
      this.namespace = Math.random().toString(36).substr(2)
    }
  }

}

export {
  Duck,
}
