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
      label: 'Reports',
      links: {
        reports: {
          label: 'List Reports',
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
          route: { name: 'readings/thresholds' }
        // },
        // reports: {
        //   label: 'Logged Data',
        //   route: { name: 'readings/index' }
        }
      }
    },
    settings: {
      label: 'Settings',
      isAdmin: true,
      links: {
        passwords: {
          label: 'Passwords',
          route: { name: 'settings/passwords' }
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
