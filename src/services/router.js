/* eslint-disable */
/*globals localStorage*/

// note;: not called from main.js yet

import LogService from 'log-service'

import events from './events'
import session from './session'
import routes from '../configuration/routes'

const logger = new LogService({ label: 'router', silent: 1 })
const storage = 'accuenergy:gateway:route'

function remember (route) {
  logger.log('remember()', route)
  localStorage.setItem(storage, JSON.stringify(route))
}

function retrieve () {
  return JSON.parse(localStorage.getItem(storage))
}

function forget () {
  logger.log('forget()')
  localStorage.removeItem(storage)
}

function assemble (to) {
  const keys = ['path', 'params', 'query', 'matched', 'name']
  const rte = keys.reduce((r, k) => {
    r[k] = to[k]
    return r
  }, {})
  logger.log('assemble()', rte)
  return rte
}

function authenticated () {
  const route = retrieve() || { name: 'home/index' }
  logger.log('authenticated()', route)
  router.go(router.$pages.default)
  forget()
}

function deauthorized () {
  logger.log('deauthorized()')
  forget()
  router.go({ name: 'login' })
}

export function initialize (router) {
  router.$pages = { default: 'customers/index' }
  router.map(routes)

  router.beforeEach((transition) => {
    logger.log('======================', 'new transition', transition.to.fullPath, transition.to)

    // public route
    logger.log('route perms', transition.to.isPublic, session.state)

    if (transition.to.isPublic === true) {
      window.scrollTo(0, 0)
      transition.next()
      return

    // private route, logged in
    } else if (session.state.auth.isAuthed) {
      window.scrollTo(0, 0)
      transition.next()
      return

    // private route, not logged in
    } else {
      events('notification:error').broadcast('You must login and have privileges to access that page')
      remember(assemble(transition.to))
      router.go({ name: 'session/login' })
      return
    }
  })

  router.afterEach((hook) => {
    const skip = ['/action/login', '/action/loading']
    logger.log('afterEach()', hook.to.name, skip.indexOf(hook.to.name))
    if (hook.to.name && skip.indexOf(hook.to.name) === -1) {
      router.$pages.last = hook.to.fullPath
    }
  })

  // router.redirect({
  //   '*': router.$pages.default
  // })

  events('authenticated').subscribe(authenticated)
  events('deauthorized').subscribe(deauthorized)

  // // debug
  // window.router = router

  return router
}
