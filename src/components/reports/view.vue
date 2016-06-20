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

import ModelMixin from '../../mixins/model'
import { component as TabComponent, mixin as TabMixin } from '../../plugins/tabs'
import ViewReport from './view-report'
import ViewReadings from './view-readings'
import ViewDevices from './view-devices'

const vue = {
  name: 'ReportsView',
  resource: 'reports',
  mixins: [ModelMixin, TabMixin],
  components: {
    TabComponent,
    ViewReport,
    // ViewBatches,
    ViewDevices,
    ViewReadings
  },
  data () {
    return {
      query: {
        related: ['device_model.device_definition']
      },
      deviceIndex: '',
      devices: [],
      tabs: [
        { code: 'settings', label: 'Settings' },
        // { code: 'devices', label: 'Devices' },
        { code: 'logs', label: 'Logs' }
      ],
      selectedTab: 'settings'
    }
  },
  computed: {
    device () {
      console.log('device()', typeof this.deviceIndex)
      if (typeof this.deviceIndex !== 'number') return {}
      return this.devices[this.deviceIndex]
    }
  }
}

export default vue
</script>

<template lang="jade">
#reports-view
  .container-fluid(v-if='!isRequesting')
    .row
      .col-sm-12
        h4
          {{ model.label }} &nbsp;
          span.small {{ model.device_model.label }}

    tab-component(:tabs='tabs', :selected-tab.sync='selectedTab', :tab-type='"pills"')

    div(v-if='selectedTab === "settings"')
      view-report(:report='model')

  //-   //- tab - devices
  //-   div(v-if='selectedTab === "logs"')
  //-     .form-group
  //-       label.control-label Select Device
  //-       view-devices(:list='model.meta.devices', :devices.sync='devices', :device-index.sync='deviceIndex')
  //-     view-readings(v-if='deviceIndex && device.id', :report='model', :device='device')
  //- //- view-devices()
</template>
