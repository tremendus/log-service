module.exports = {

  // develop routes
  '/adapter': {
    name: 'adapter',
    component: require('../components/develop/adapter')
  },

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
          },
          '/add': {
            name: 'devices/add',
            component: require('../components/devices/add')
          },
          '/edit/:deviceId': {
            name: 'devices/edit',
            component: require('../components/devices/edit')
          }
        }
      },
      '/device-models': {
        name: 'device-models',
        component: {
          name: 'DeviceModels',
          template: '<div id="#device-models"><router-view /></div>'
        },
        subRoutes: {
          '/': {
            name: 'device-models/index',
            component: require('../components/device-models/index')
          },
          '/view/:deviceModelId': {
            name: 'device-models/view',
            component: require('../components/device-models/view')
          },
          '/add': {
            name: 'device-models/add',
            component: require('../components/device-models/add')
          }
        }
      },

      // todo: move to settings?
      '/users': {
        name: 'users',
        component: {
          name: 'users',
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
          },
          '/edit/:userId': {
            name: 'users/edit',
            component: require('../components/users/edit')
          },
          '/add': {
            name: 'users/add',
            component: require('../components/users/add')
          }
        }
      },
      '/settings': {
        name: 'settings',
        component: {
          name: 'Settings',
          template: '<div id="#settings"><router-view /></div>'
        },
        subRoutes: {
          '/network': {
            name: 'settings/network',
            component: require('../components/settings/network')
          }
        }
      },
      '/system': {
        name: 'system',
        component: {
          name: 'System',
          template: '<div id="#system"><router-view /></div>'
        },
        subRoutes: {
          '/info': {
            name: 'system/info',
            component: require('../components/system/info')
          },
          '/status': {
            name: 'system/status',
            component: require('../components/system/status')
          },
          '/logs': {
            name: 'system/logs',
            component: require('../components/system/logs')
          },
          '/tests': {
            name: 'system/tests',
            component: require('../components/system/tests')
          }
        }
      },
      '/reports': {
        name: 'reports',
        component: {
          name: 'Reports',
          template: '<div id="#reports"><router-view /></div>'
        },
        subRoutes: {
          '/': {
            name: 'reports/index',
            component: require('../components/reports/index')
          },
          '/view/:reportId': {
            name: 'reports/view',
            component: require('../components/reports/view')
          },
          '/edit/:reportId': {
            name: 'reports/edit',
            component: require('../components/reports/edit')
          },
          '/add': {
            name: 'reports/add',
            component: require('../components/reports/add')
          }
        }
      },
      '/credentials': {
        name: 'credentials',
        component: {
          name: 'credentials',
          template: '<div id="#credentials"><router-view /></div>'
        },
        subRoutes: {
          '/': {
            name: 'credentials/index',
            component: require('../components/credentials/index')
          },
          '/view/:credentialId': {
            name: 'credentials/view',
            component: require('../components/credentials/view')
          },
          '/edit/:credentialId': {
            name: 'credentials/edit',
            component: require('../components/credentials/edit')
          },
          '/add': {
            name: 'credentials/add',
            component: require('../components/credentials/add')
          }
        }
      },

      // no route
      'no-route': {
        name: 'no-route',
        component: {
          template: '<div><h3>Route not wired up</h3><p>Add config/route, add to config/navigation, create components/component.vue</p></div>'
        }
      }
    }
  },

  // login
  '/login': {
    component: require('../components/layouts/mask'),
    subRoutes: {
      '/index': {
        name: 'login/index',
        component: require('../components/login/index')
      }
    }
  }
}
