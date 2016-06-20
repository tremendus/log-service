import 'babel-polyfill'

// oem
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueValidator from 'vue-validator'

// plugins
import DebugComponent from './plugins/debug'
import SpinnerComponent from './plugins/spinner'
import { initialize as initializeValidationRules } from './plugins/validation'

// system
import { initialize as initializeSession } from './services/session'
import { initialize as initializeRouter } from './services/router'

// configuration
import routerConfig from './configuration/router'

// components
import App from './components/app'

// initialize
Vue.config.debug = true
Vue.use(VueRouter)
Vue.use(VueValidator)
Vue.use(DebugComponent)
Vue.use(SpinnerComponent)

// session
initializeSession()

// router
const router = initializeRouter(new VueRouter(routerConfig))
router.start(App, 'app')

// validation
initializeValidationRules(Vue)

// develop
// require('./services/authenticator')
