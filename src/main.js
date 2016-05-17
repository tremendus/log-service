import 'babel-polyfill'

// oem
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'

// plugins
import DebugComponent from './plugins/debug'
import SpinnerComponent from './plugins/spinner'
import { initialize as initializeValidationRules } from './plugins/validation'

// configuration
import routerConfig from './configuration/router'
import routes from './configuration/routes'
// import { initialize as initializeRouter } from './services/router'
// import { initialize as initializeSession } from './services/session'
// import deps from './deps' // eslint-disable-line no-unused-vars

// main component
import AppVue from './components/app.vue'

// initialize
Vue.config.debug = true
Vue.use(VueRouter)
Vue.use(VueValidator)
Vue.use(DebugComponent)
Vue.use(SpinnerComponent)

// session
// initializeSession()

// router
const router = new VueRouter(routerConfig)
router.map(routes) // note: temp: later, direct to router
// initializeRouter(router)
router.start(AppVue, '#app')

// validation
initializeValidationRules(Vue)

// develop
// require('./services/authenticator')
