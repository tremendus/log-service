import Emitter from 'events'
import Adapter from './adapter'

class Store extends Emitter {

  // constructor () {
  //   super()
  //   // todo
  // }

  serialize () {
    // todo
  }

  deserialize (data) {
    return JSON.parse(data)
  }

  create () {
    // todo
  }

  /*eslint-disable*/
  static findOne (model, id) {
    // todo
    const find = Adapter.findOne(model, id)
    console.log('find', find)
    const first = find.next()
    console.log('first', first)
    const second = find.next()
    console.log('second', second)
    return find.next()
  }

  findMany () {
    // todo
  }

  update () {
    // todo
  }

  destroy () {
    // todo
  }
}

export default Store
