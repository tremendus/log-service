<script>
// import { readMany } from 'restful-service'
import LogsReports from './logs-reports'
import LogsBatches from './logs-batches'
import LogsReadings from './logs-readings'

var vue = {
  name: 'DeviceLogs',
  props: ['device'],
  components: {
    LogsReports,
    LogsBatches,
    LogsReadings
  },
  data () {
    return {
      report: '',
      batch: ''
    }
  }
}

export default vue
</script>

<template lang="jade">
#device-logs
  logs-reports(:device='device', :report.sync='report')
  logs-batches(:device='device', :report='report', :batch.sync='batch')
  logs-readings(:batch.sync='batch')
</template>
