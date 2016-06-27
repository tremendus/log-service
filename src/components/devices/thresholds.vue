<script>
import { readMany } from '../../services/store'

const vue = {
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
        }],
        related: ['batch.report', 'device.device_model.device_definition']
      },
      readings: [],
      tableReady: false
    }
  },
  computed: {
    rows () {
      /* eslint-disable */
      return this.readings.map((r) => {
        let col = {
          reading: r,
          param: r.device.device_model.device_definition.meta.params.find((dp) => dp.id === r.parameter),
          report_param: r.batch.report.meta.parameters.find((rp) => rp.id === r.parameter)
        }
        console.log('col', col)
        return col
      })
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      readMany('readings', this.query)
        .then((data) => {
          this.readings = data.collection
          this.tableReady = true
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
  h4 Thresholds &amp; Alarms
  //- debug(:debug='rows')
  .table-responsive(v-if='tableReady && readings.length')
    table.table.table-bordered.table-striped
      thead
        tr
          th Date/Time
          th Param
          th Condition
          th Min
          th Max
          th Reading
          th Alarm
      tbody
        tr(v-for='row in rows')
          td {{ row.reading.created_at }}
          td {{ row.param.label }}
          td {{ row.reading.status }}
          td {{ row.report_param.min }}
          td {{ row.report_param.max }}
          td {{ row.reading.value }}
          td {{ row.report_param.alert ? 'Yes' : 'No' }}
</template>
