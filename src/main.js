import Vue from 'vue'
import VueRouter from 'vue-router'
import DebugComponent from './plugins/debug'
import routerConfig from './configuration/router'
import routes from './configuration/routes'
// import { initialize as initializeRouter } from './services/router'
// import { initialize as initializeSession } from './services/session'
// import deps from './deps' // eslint-disable-line no-unused-vars
import AppVue from './components/app.vue'

Vue.config.debug = true
Vue.use(VueRouter)
Vue.use(DebugComponent)

// session
// initializeSession()

// router
const router = new VueRouter(routerConfig)
router.map(routes) // note: temp: later, direct to router
// initializeRouter(router)
router.start(AppVue, '#app')

// develop
// require('./services/authenticator')
