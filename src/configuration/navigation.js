export default {
  default: {
    home: {
      label: 'Home',
      route: { name: 'home' }
    },
    devices: {
      label: 'Devices',
      links: {
        list: {
          label: 'List Devices',
          route: { name: 'devices/index' }
        }
      }
    },
    reports: {
      label: 'Reports',
      links: {
        alarms: {
          label: 'Alarms',
          route: { name: 'no-route' }
        },
        reports: {
          label: 'Reports',
          route: { name: 'no-route' }
        },
        templates: {
          label: 'Templates',
          route: { name: 'no-route' }
        }
      }
    },
    settings: {
      label: 'Settings',
      isAdmin: true,
      links: {
        users: {
          label: 'Users',
          route: { name: 'users/index' }
        },
        network: {
          label: 'Network',
          route: { name: 'settings/network' }
        },
        protocols: {
          label: 'Protocols',
          route: { name: 'no-route' }
        },
        storage: {
          label: 'Storage',
          route: { name: 'no-route' }
        }
      }
    },
    system: {
      label: 'System',
      links: {
        info: {
          label: 'Info',
          route: { name: 'system/info' }
        },
        status: {
          label: 'Status',
          route: { name: 'system/status' }
        },
        logs: {
          label: 'Logs',
          route: { name: 'system/logs' }
        },
        tests: {
          label: 'Tests',
          route: { name: 'system/tests' }
        }
      }
    }
  }
}
