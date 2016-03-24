// todo: configuration for adapter

import request from 'superagent'
// import config from '../configuration/adapter'

// todo: handle caught errors
function error (err) {
  console.error('handledError', err)
}

export function create (model, data) {
  const url = ['http://localhost:3333', model].join('/')
  return new Promise((resolve, reject) => {
    request
      .post(url)
      .send(data)
      .end((err, res) => { err ? reject(err) : resolve(res.body) })
  }).catch(error)
}

export function readOne (model, id) {
  const url = ['http://localhost:3333', model, id].join('/')
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .end((err, res) => { err ? reject(err) : resolve(res.body) })
  }).catch(error)
}

export function readMany (model, query) {
  const url = ['http://localhost:3333', model].join('/')
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .end((err, res) => { err ? reject(err) : resolve(res.body) })
  }).catch(error)
}

export function update (model, data) {
  const url = ['http://localhost:3333', model, data.id].join('/')
  return new Promise((resolve, reject) => {
    request
      .put(url)
      .send(data)
      .end((err, res) => { err ? reject(err) : resolve(res.body) })
  }).catch(error)
}

export function destroy (model, id) {
  const url = ['http://localhost:3333', model, id].join('/')
  return new Promise((resolve, reject) => {
    request
      .delete(url)
      .end((err, res) => { err ? reject(err) : resolve(res.body) })
  }).catch(error)
}

export function action (route, method = 'get') {
  // todo: consider implementings opts (eg to post data)
  const url = ['http://localhost:3333', route].join('/')
  return new Promise((resolve, reject) => {
    request[method](url)
      .end((err, res) => { err ? reject(err) : resolve(res.body) })
  }).catch(error)
}
