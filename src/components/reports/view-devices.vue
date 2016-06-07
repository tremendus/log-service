<script>
import { readMany } from 'restful-service'
var vue = {
  name: 'ReportsViewDevices',
  props: ['list', 'devices', 'deviceIndex'],
  data () {
    return {
      query: {
        filters: [{
          method: 'whereIn',
          filter: ['id', this.list]
        }],
        related: ['device_model.device_definition']
      }
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      readMany('devices', this.query)
        .then((devices) => {
          this.devices = devices
        })
    }
  }
}
export default vue
</script>

<template lang="jade">
#reports-view-devices
  select.form-control(v-model='deviceIndex')
    option(value='') Select One
    option(v-for='(i, device) in devices', :value='i') {{ device.label }}
</template>
