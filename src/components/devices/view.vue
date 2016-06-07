<script>
import { readOne } from 'restful-service'
import { mixin as TabMixin, component as TabComponent } from '../../plugins/tabs'
import DeviceReadings from './readings'
import DeviceLogs from './logs'
import DeviceThresholds from './thresholds'

const vue = {
  name: 'DevicesView',
  components: {
    TabComponent,
    DeviceReadings,
    DeviceLogs,
    DeviceThresholds
  },
  mixins: [TabMixin],
  data () {
    return {
      query: {
        device: {
          related: ['device_model.device_definition']
        }
      },
      model: [],
      tabs: [
        { code: 'readings', label: 'Realtime Readings' },
        { code: 'logs', label: 'Historical Data' },
        { code: 'thresholds', label: 'Thresholds & Alarms' }
      ],
      selectedTab: 'readings'
    }
  },
  computed: {
    selectedComponent () {
      const s = this.selectedTab
      return 'Device' + s.charAt(0).toUpperCase() + s.substring(1)
    }
  },
  route: {
    data () {
      return {
        model: readOne('devices', this.$route.params.deviceId, this.query.device)
      }
    }
  },
  watch: {

  }
}

export default vue
</script>

<template lang="jade">
#devices-view
  .container-fluid
    .row
      .col-xs-12(v-if='!$loadingRouteData')
        h3 {{ model.label }}

        .panel.panel-default
          .panel-heading
            h4.panel-title Device Configuration
          .panel-body
            .row
              .col-xs-6
                .form-group
                  label.control-label Label
                  p.static-form-control {{ model.label }}
                .form-group
                  label.control-label Device Type
                  p.static-form-control {{ model.device_model.label }}
                .form-group
                  a.btn.btn-primary(v-link='{ name: "devices/edit", params: { deviceId: model.id } }') Edit
              .col-xs-6
                .form-group
                  label.control-label Protocol
                  p.static-form-control MODBUS {{ model.meta.protocols.modbus.use | uppercase }}
                div(v-if='model.meta.protocols.use === "tcp"')
                  .form-group
                    label.control-label IP Address
                    p.static-form-control {{ model.meta.protocols.modbus.tcp.ip }}
                  .form-group
                    label.control-label Port
                    p.static-form-control {{ model.meta.protocols.modbus.tcp.port }}
                div(v-if='model.meta.protocols.use === "rtu"')
                  .form-group
                    label.control-label Device
                    p.static-form-control {{ model.meta.protocols.modbus.rtu.device }}
                  .form-group
                    label.control-label Port
                    p.static-form-control {{ model.meta.protocols.modbus.rtu.port }}
                  .form-group
                    label.control-label Baud
                    p.static-form-control {{ model.meta.protocols.modbus.rtu.baud }}
                  .form-group
                    label.control-label Data Bit
                    p.static-form-control {{ model.meta.protocols.modbus.rtu.dataBit }}
                  .form-group
                    label.control-label Parity
                    p.static-form-control {{ model.meta.protocols.modbus.rtu.parity }}
                  .form-group
                    label.control-label Stop Bit
                    p.static-form-control {{ model.meta.protocols.modbus.rtu.stopBit }}

        tab-component(:tabs='tabs', :selected-tab.sync='selectedTab', :tab-type='"pills"')

        component(:is='selectedComponent', :device='model')
</template>

<style lang="stylus">
.gateway-tabs
  margin-bottom 1.5em
</style>
