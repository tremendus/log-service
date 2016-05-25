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
        },
        list_models: {
          label: 'Device Models',
          route: { name: 'device-models/index' }
        }
      }
    },
    reports: {
      label: 'Report Config',
      links: {
        alarms: {
          label: 'Alarms',
          route: { name: 'no-route' }
        },
        reports: {
          label: 'Reports',
          route: { name: 'reports/index' }
        }
        // reports_add: {
        //   label: 'Reports Add',
        //   route: { name: 'reports/add' }
        // }
        // templates: {
        //   label: 'Templates',
        //   route: { name: 'no-route' }
        // }
      }
    },
    data: {
      label: 'Data & Logs',
      links: {
        thresholds: {
          label: 'Exceptions',
          route: { name: 'no-route' }
        },
        reports: {
          label: 'Normal Data',
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
        },
        exports: {
          label: 'Export Profiles',
          route: { name: 'credentials/index' }
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
