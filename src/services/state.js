import EventEmitter from 'events'

class state extends EventEmitter {
  mutate (key, data) {
    Object.assign(this[key], data)
  }
}

export default state
