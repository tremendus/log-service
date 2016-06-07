<script>
import { readMany } from 'restful-service'

var vue = {
  name: 'DeviceThresholds',
  props: ['device'],
  data () {
    return {
      query: {
        where: {
          device_id: this.device.id
        },
        filters: [{
          method: 'whereNotIn',
          filter: ['status', ['ok']]
        }]
      },
      readings: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      readMany('readings', this.query)
        .then((readings) => {
          this.readings = readings
        })
    }
  },
  watch: {
    batch () {
      this.fetch()
    }
  }
}

export default vue
</script>

<template lang="jade">
#device-thresholds
  h4 device-thresholds
  debug(:debug='readings')
</template>
