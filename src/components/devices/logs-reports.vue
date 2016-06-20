<script>
import { action } from '../../services/store'

const vue = {
  name: 'DeviceLogsReports',
  props: ['device', 'report', 'reports'],
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      action('reports/fetch/' + this.device.id, 'get')
        .then((reports) => {
          this.reports = reports
        })
    }
  }
}

export default vue
</script>

<template lang="jade">
#device-logs-reports
  .form-group
    label.control-label Select Report
    select.form-control(v-model='report')
      option(value='') Select One
      option(v-for='rep in reports', :value='rep.id') {{ rep.label }}
</template>
