/* global localStorage */

import LogService from 'log-service'
import { action } from './store'
import events from './events'
// import config from '../configuration/session'
// import state from './state'

const logger = new LogService({ label: 'session', silent: 1 })

// todo: move to config?
// todo: session expiry
const prefix = 'accuenergy:gateway:'

function mutate (key, data) {
  // todo: install proper immutable
  const _data = state[key]
  Object.assign(_data, data)
}

function read (key) {
  const keyPath = prefix + key
  const value = localStorage.getItem(keyPath)
  logger.log('read()', keyPath, value)
  if (!value) {
    return null
  }
  const data = JSON.parse(value)
  const now = new Date().getTime()
  logger.log('read():expires', data._expires, now, data._expires < now)

  // if (data._expires < now) {
  //   destroy(key)
  //   return null
  // }

  logger.log('read()', key, data)
  return data
}

function write (key, data) {
  const keyPath = prefix + key
  logger.log('write()', key, data, keyPath)
  // data._expires = new Date().getTime() + (1000 * config.duration)
  const value = JSON.stringify(data)
  localStorage.setItem(keyPath, value)
  return
}

function destroy (key) {
  logger.log('destroy()', key)
  const keyPath = prefix + key
  localStorage.removeItem(keyPath)
  throw new Error('Something called destroy')
}
// todo: remove window.destroy
window.destroy = destroy

const state = {
  auth: {}
}

const authData = {
  isAuthed: false,
  token: null,
  user: {}
}

function authorize (auth) {
  if (!auth || !auth.token) {
    throw new Error('No auth passed to authorize, required')
  }
  const _auth = Object.assign({}, authData, auth, { isAuthed: true })
  mutate('auth', _auth)
  events('session:authorized').broadcast(_auth)
}

export function authenticate (credentials) {
  logger.log('authenticate()', credentials)
  action('users/authenticate', 'post', { data: { auth: credentials } })
    .then((response) => {
      // todo: handle errors (or adapter?) and unauthorized
      write('auth', response)
      authorize(response)
    }).catch((error) => {
      // todo: look at error status code
      error.status
      destroy('auth')
      events('session:notAuthorized').broadcast()
    })
}

export function deauthorize () {
  const _auth = Object.assign({}, authData)
  mutate('auth', _auth)
  destroy('auth')
  events('session:deauthorized').broadcast()
}

export function initialize () {
  const auth = read('auth') || {}
  logger.log('initialize()', auth)
  if (!auth.token) {
    return false
  }
  // todo: test the token on the server?
  authorize(auth)
}

export default {
  authenticate,
  deauthorize,
  state
}
