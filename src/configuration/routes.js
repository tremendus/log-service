module.exports = {

  // application routes
  '/app': {
    name: 'app',
    component: require('../components/layouts/default'),
    subRoutes: {
      '/home': {
        name: 'home',
        component: require('../components/home/index')
      },
      '/meters': {
        name: 'meters',
        component: require('../components/develop/meters')
      },
      '/users': {
        name: 'users',
        component: require('../components/develop/users')
      }
    }
  }
}
