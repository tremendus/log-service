import request from 'superagent'
import config from '../configuration/adapter'
import events from './events'
import LogService from 'log-service'

const logger = new LogService({ label: 'adapter', silent: 1 })

function handleError (error, route, method, opts, res) {
  const message = errorMessage(method, res)
  events('notification:error').broadcast(message)
  events('error:handle').broadcast({ error, route, method, opts, res })
  logger.error('handleError()', message)
}

function errorMessage (method, res) {
  console.log('errorMessage():method', method)
  let message = ''
  switch (method) {
    case 'get':
      message = 'Failed to fetch data from the server'
      break
    case 'patch':
      message = 'Failed to update record on the server'
      break
    case 'put':
      message = 'Failed to update record on the server'
      break
    case 'post':
      message = 'Failed to post data to the server'
      break
    case 'delete':
      message = 'Failed to delete record from the server'
      break
    default:
      message = 'Failed to communicate with the server or there was an error on the server'
  }
  // logger.log('errorMessage()', method, message)
  message += ' (' + res.statusCode + ': ' + res.statusText + ')'
  return message
}

export function create (model, data, opts = {}) {
  const route = opts.url || ['api', model].join('/')
  const send = Object.assign({}, opts, { data: { model: data } })
  logger.log('create()', send)
  return action(route, 'post', send)
}

export function readOne (model, id, opts = {}) {
  const route = opts.url || ['api', model, id].join('/')
  const send = { query: opts }
  logger.log('read()', send)
  return action(route, 'get', send)
}

export function readMany (model, query, opts = {}) {
  const route = opts.url || ['api', model, 'query'].join('/')
  const send = Object.assign({}, opts, { data: query })
  logger.log('readMany()', send)
  return action(route, 'post', send)
}

export function update (model, data, opts = {}) {
  const route = opts.url || ['api', model, data.id].join('/')
  const send = Object.assign({}, opts, { data: { model: data } })
  logger.log('update()', send)
  return action(route, 'patch', send)
}

export function destroy (model, id, opts = {}) {
  const route = opts.url || ['api', model, id].join('/')
  logger.log('destroy()', id)
  return action(route, 'delete')
}

export function action (route, method = 'get', opts = {}) {
  logger.log('action()', route, method, opts)
  const url = [config.host, route].join('/')
  return new Promise((resolve, reject) => {
    request[method](url)
      .query(opts.query)
      .send(opts.data)
      .end((error, res) => {
        if (error) {
          handleError(error, route, method, opts, res)
          reject()
          return
        }
        resolve(res.body)
      })
  })
  // .catch((error) => {
  //   handleError(error, route, method, opts)
  //   reject({})
  // })
}
