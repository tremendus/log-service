<script>
import ModelMixin from '../../mixins/model'
import { mixin as TabMixin, component as TabComponent } from '../../plugins/tabs'
import DeviceReadings from './readings'
import DeviceLogs from './logs'
import DeviceThresholds from './thresholds'

const vue = {
  name: 'DevicesView',
  resource: 'devices',
  components: {
    TabComponent,
    DeviceReadings,
    DeviceLogs,
    DeviceThresholds
  },
  mixins: [ModelMixin, TabMixin],
  data () {
    return {
      query: {
        related: ['device_model.device_definition']
      },
      tabs: [
        {
          code: 'readings',
          label: 'Realtime Readings'
        },
        {
          code: 'logs',
          label: 'Historical Data'
        },
        {
          code: 'thresholds',
          label: 'Thresholds & Alarms'
        }
      ],
      selectedTab: 'logs'
    }
  },
  computed: {
    selectedComponent () {
      const s = this.selectedTab
      return 'Device' + s.charAt(0).toUpperCase() + s.substring(1)
    }
  }
}

export default vue
</script>

<template lang="jade">
#devices-view
  .container-fluid
    .row
      .col-xs-12(v-if='!isRequest && model')
        h3 {{ model.label }}
        tab-component(:tabs='tabs', :selected-tab.sync='selectedTab', :tab-type='"pills"', keep-alive)
        component(:is='selectedComponent', :device='model')
</template>

<style lang="stylus">
.gateway-tabs
  margin-bottom 1.5em
</style>
