import Emitter from 'events'

class Adapter extends Emitter {

  // constructor () {
  //   super()
  // }

  static * findOne (model, id) {
    yield model
    yield id
    return id + model
  }

}

export default Adapter
