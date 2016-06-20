<script>
// import { action } from '../../services/store'

const vue = {
  name: 'DeviceReadings',
  props: ['device'],
  interval: {}, // interval placeholder
  data () {
    return {
      readings: []
    }
  },
  computed: {
    params () {
      // todo: map the readings to the params _value hash
      return this.device.device_model.device_definition.meta.params || []
    },
    sortedParams () {
      const params = this.params
      const sorted = params.sort((a, b) => {
        if (a.label < b.label) return -1
        if (a.label > b.label) return 1
        return 0
      })
      return sorted
    }
  },
  created () {
    this.fetch()
    this.interval = setInterval(this.fetch, 3000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    fetch () {
      console.log('DeviceReadings:fetch()')
      // return action('', this.query.batches)
      //   .then((batches) => {
      //     this.batches = batches
      //     return Promise.resolve()
      //   })
    }
  }
}

export default vue
</script>

<template lang="jade">
#device-readings
  .panel.panel-default
    .panel-heading
      h4.panel-title Device Readings
    table.table.table-striped
      thead
        tr
          th Parameter
          th.text-center Status
          th Reading
      tbody
        tr(v-for='param in params')
          td {{ param.label }}
          td.text-center Ok
          td {{ param.value }}{{ param.units }}
</template>
