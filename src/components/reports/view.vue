<script>
// workflow
// use selected report
// filter for from/to dates/times (batches)
// filter for device (next/prev)
// outputs table
//   params x
//   timestamp y
// option to download as format
// > option to export to credential

import { readOne } from 'restful-service'
import { component as TabComponent, mixin as TabMixin } from '../../plugins/tabs'
import ViewReport from './view-report'
import ViewReadings from './view-readings'
import ViewDevices from './view-devices'

var vue = {
  name: 'ReportsView',
  components: {
    TabComponent,
    ViewReport,
    // ViewBatches,
    ViewDevices,
    ViewReadings
  },
  mixins: [TabMixin],
  data () {
    return {
      report: {},
      deviceIndex: '',
      devices: [],
      tabs: [
        { code: 'logs', label: 'Historical Data' },
        { code: 'thresholds', label: 'Thresholds & Alarms' },
        { code: 'configuration', label: 'Configuration' }
      ],
      selectedTab: 'logs'
    }
  },
  computed: {
    device () {
      console.log('device()', typeof this.deviceIndex)
      if (typeof this.deviceIndex !== 'number') return {}
      return this.devices[this.deviceIndex]
    }
  },
  route: {
    data () {
      return {
        report: readOne('report', this.$route.params.reportId)
      }
    }
  }
}

export default vue
</script>

<template lang="jade">
#reports-view
  //- view-report
  //- debug(:debug='report')
  div(v-if='!$loadingRouteData')
    .form-group
      label.control-label Select Device
      view-devices(:list='report.meta.devices', :devices.sync='devices', :device-index.sync='deviceIndex')
    div(v-if='device.id')
      view-readings(:report='report', :device='device')
  //- view-devices()
</template>
