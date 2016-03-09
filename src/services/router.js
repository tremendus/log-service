import LogService from '../services/log'
import session from './session'
import { state, login } from './session'
import routes from '../configuration/routes'

const logger = new LogService({ label: 'router', silent: 0 })

const storage = 'harmoni:route'

function remember (route) {
  logger.log('remember', route)
  localStorage.setItem(storage, JSON.stringify(route))
  // if (typeof route === 'string') {
  //   localStorage.setItem(storage, route)
  // }
}

function retrieve () {
  return JSON.parse(localStorage.getItem(storage))
  // return localStorage.getItem(storage)
}

function forget () {
  logger.log('retrieve')
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

export function initialize (router) {

  router.map(routes)

  router.beforeEach((transition) => {

    logger.log('======================', 'new transition', transition.to.fullPath)

    // public route
    if (transition.to.isPublic === true) {
      transition.next()
      window.scrollTo(0, 0)
      return

    // private route, logged in
    } else if (state.cache.isAuthed) {
      window.scrollTo(0, 0)
      transition.next()
      // localStorage.
      return

    // private route, not logged in
    } else {
      remember(assemble(transition.to))
      login()
      router.go({ name: 'loading' })
      return
    }
  })

  // router.afterEach((hook) => {
  //   const skip = ['/action/login', '/action/loading']
  //   logger.log('afterEach()', hook.to.name, skip.indexOf(hook.to.name))
  //   if (hook.to.name && skip.indexOf(hook.to.name) === -1) {
  //     router.$pages.last = hook.to.fullPath
  //   }
  // })

  // router.redirect({
  //   '*': router.$pages.default
  // })

  // // todo: any state related events?
  // // state.on()

  session.on('authenticating', (provider) => {
    logger.log('authenticating', provider)
    router.go({ name: 'loading' })
  })

  session.on('authenticated', () => {
    const route = retrieve() || { name: 'tasks'}
    logger.log('authenticated', route)
    forget()
    router.go(route)
  })

  session.on('unauthenticated', () => {
    logger.log('unauthenticated')
    router.go({ name: 'login' })
  })

  // debug
  window.router = router

}
