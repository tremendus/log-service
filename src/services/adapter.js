// todo: configuration for adapter

import request from 'superagent'
import config from '../configuration/adapter'

// todo: handle caught errors
function error (err) {
  console.error('handledError', err)
}

export function create (model, data, opts = {}) {
  const url = opts.url || [config.host, model].join('/')
  return new Promise((resolve, reject) => {
    request
      .post(url)
      .send(data)
      .end((err, res) => { err ? reject(err) : resolve(res.body) })
  }).catch(error)
}

export function readOne (model, id, opts = {}) {
  const url = opts.url || [config.host, model, id].join('/')
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .end((err, res) => { err ? reject(err) : resolve(res.body) })
  }).catch(error)
}

export function readMany (model, query, opts = {}) {
  const url = opts.url || [config.host, model].join('/')
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .end((err, res) => { err ? reject(err) : resolve(res.body) })
  }).catch(error)
}

export function update (model, data, opts = {}) {
  const url = opts.url || [config.host, model, data.id].join('/')
  return new Promise((resolve, reject) => {
    request
      .put(url)
      .send(data)
      .end((err, res) => { err ? reject(err) : resolve(res.body) })
  }).catch(error)
}

export function destroy (model, id, opts = {}) {
  const url = opts.url || [config.host, model, id].join('/')
  return new Promise((resolve, reject) => {
    request
      .delete(url)
      .end((err, res) => { err ? reject(err) : resolve(res.body) })
  }).catch(error)
}

export function action (route, method = 'get', opts = {}) {
  // todo: consider implementings opts (eg to post data)
  const url = opts.url || [config.host, route].join('/')
  return new Promise((resolve, reject) => {
    request[method](url)
      .send(opts.data)
      .end((err, res) => { err ? reject(err) : resolve(res.body) })
  }).catch(error)
}
