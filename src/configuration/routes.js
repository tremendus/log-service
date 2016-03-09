module.exports = {

  // application routes
  '/app': {
    name: 'app',
    component: require('../components/layouts/default'),
    subRoutes: {
      '/home': {
        component: require('../components/home/index')
      }
    }
  }
}
