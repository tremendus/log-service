/*eslint-disable*/

import * as adapter from './adapter'

function serialize () {
  // handled by SuperAgent
}

function deserialize (data) {
  // handled by SuperAgent
}

export function create (model, data) {
  return adapter.create(model, data)
}

export function findMany (model, query) {
  return adapter.findMany(model, query)
}

export function findOne () {
  // todo
}

export function update () {
  // todo
}

export function destroy (model, id) {
  return adapter.destroy(model, id)
}

// experiment with yield/generator
export function findMany1 (model, query) {
  const find = adapter.findMany1(model, query)
  const res = find.next()
  // const b = find.next()
  // const c = find.next()
  console.log('store:res', res.value.xhr.response)
  return this.deserialize(res.value.xhr.response)
}
