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
          route: { name: 'no-route' }
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
          route: { name: 'no-route' }
        },
        status: {
          label: 'Status',
          route: { name: 'no-route' }
        },
        logs: {
          label: 'Logs',
          route: { name: 'no-route' }
        },
        tests: {
          label: 'Tests',
          route: { name: 'no-route' }
        }
      }
    }
  }
}
