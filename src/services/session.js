/* global localStorage */

import LogService from './log'
import { action } from './adapter'
import EventEmitter from 'events'
import config from '../configuration/session'
// import state from './state'

const logger = new LogService({ label: 'session', silent: 0 })

const prefix = 'accuenergy:gateway:'

function mutate (key, data) {
  // todo: install proper immutable
  const _data = state[key]
  Object.assign(_data, data)
}

function read (key) {
  const keyPath = prefix + key
  const value = localStorage.getItem(keyPath)
  if (!value) {
    return null
  }
  const data = JSON.parse(value)
  const now = new Date().getTime()
  console.log('read():expires', data._expires, now, data._expires < now)

  if (data._expires < now) {
    destroy(key)
    return null
  }
  logger.log('read()', key, data)
  return data
}

function write (key, data) {
  logger.log('write()', key, data)
  const keyPath = prefix + key
  data._expires = new Date().getTime() + (1000 * config.duration)
  const value = JSON.stringify(data)
  localStorage.setItem(keyPath, value)
  return
}

function destroy (key) {
  logger.log('destroy()', key)
  const keyPath = prefix + key
  localStorage.removeItem(keyPath)
}
window.destroy = destroy

const state = {
  auth: {
    isAuthed: false,
    user: {}
  }
}

function initState () {
  let _state = Object.assign({}, state)
  const user = read('user') || {}
  _state.auth.user = user
  if (user.token) {
    authorize(user)
  }
  return _state
}

function authorize (user) {
  if (!user || !user.token) {
    throw new Error('No user passed to authorize, required')
  }
  const auth = Object.assign({}, state.auth)
  auth.isAuthed = true
  auth.user = user
  mutate('auth', auth)
  session.emit('authorized', auth)
}

export function authenticate (user) {
  logger.log('authenticate()', user)
  action('users/authenticate', 'post', { data: user })
    .then((response) => {
      // todo: handle errors (or adapter?) and unauthorized
      const user = response
      authorize(user)
      write('user', user)
    })
    .catch((error) => {
      // this.emit('error', error)
      error
    })
}

export function initialize () {

}

const session = new EventEmitter()
session.authenticate = authenticate
session.state = initState()
export default session
