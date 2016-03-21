module.exports = {

  // application routes
  '/gateway': {
    name: 'gateway',
    component: require('../components/layouts/default'),
    subRoutes: {
      '/home': {
        name: 'home',
        component: require('../components/home/index')
      },
      '/devices': {
        name: 'devices',
        component: {
          name: 'Devices',
          template: '<div id="#devices"><router-view /></div>'
        },
        subRoutes: {
          '/': {
            name: 'devices/index',
            component: require('../components/devices/index')
          },
          '/view/:deviceId': {
            name: 'devices/view',
            component: require('../components/devices/view')
          }
        }
      },
      '/users': {
        name: 'users',
        component: {
          name: 'Users',
          template: '<div id="#users"><router-view /></div>'
        },
        subRoutes: {
          '/': {
            name: 'users/index',
            component: require('../components/users/index')
          },
          '/view/:userId': {
            name: 'users/view',
            component: require('../components/users/view')
          }
        }
      }
    }
  }
}
