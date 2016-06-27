<script>
/*
 * page logic:
 *
 * action() : find reports
 * watch report: if one, or when select, load batches
 * load batches by paginate 20 (eg 20 timestamps)
 * watch: when batches, get readings
 * computed: format the data by param x, batch y
 *
 * if no reports
 * if no batches
 * if no readings
*/

import { action, readMany } from '../../services/store'
// import LogsReports from './logs-reports'
// import LogsBatches from './logs-batches'
// import LogsReadings from './logs-readings'

const vue = {
  name: 'DeviceLogs',
  props: ['device'],
  components: {
    // LogsReports,
    // LogsBatches,
    // LogsReadings
  },
  data () {
    return {
      reports: [],
      batches: [],
      readings: [],
      query: {
        batches: {
          where: { report_id: 0 },
          limit: 2,
          page: 1
        },
        readings: {
          filters: [{
            method: 'whereIn',
            filter: ['batch_id', null]
          }],
          limit: 0,
          page: 1
        }
      },
      meta: {
        batches: {}
      },
      tableReady: false
    }
  },
  computed: {
    batchList () {
      const bs = this.batches.map((b) => b.id)
      return bs
    },
    selectedReport () {
      return this.query.batches.where.report_id
    },
    selectedPage () {
      return this.query.batches.page
    },
    cols () {
      const report = this.reports.find((r) => r.id === this.selectedReport)
      return report.meta.parameters
        .map((rp) => this.device.device_model.device_definition.meta.params.find((dp) => rp.id === dp.id))
    },
    rows () {
      if (!this.readings.length || !this.tableReady) return {}

      const report = this.reports.find((r) => r.id === this.selectedReport)
      if (!report) return {}

      // device params
      const dmps = this.device.device_model.device_definition.meta.params
      console.log('dmps', dmps)

      // cols
      const rps = report.meta.parameters
      console.log('cols:', rps)

      // rows
      const bs = this.batches
      console.log('rows:', bs)

      // iterate params - rows
      const rows = bs.map((b) => {
        console.log('row', b)
        b.cols = rps.map((rp) => {
          console.log('ids', b.id, rp.id)
          let col = {
            report_param: rp,
            param: Object.assign({}, dmps.find((dmp) => rp.id === dmp.id)),
            reading: Object.assign({}, this.readings.find((r) => {
              return r.batch_id === b.id && r.parameter === rp.id
            }))
          }
          if (!col.reading || !col.reading.value) {
            console.warn('no reading or value', col)
          } else {
            console.log('col.reading.value', b.id, rp.id, col.reading.value)
          }
          return col
        })
        return b
      })
      console.log('rows', typeof rows, Array.isArray(rows))
      return rows
    }
  },
  created () {
    this.fetchReports()
  },
  methods: {
    fetchReports () {
      this.tableReady = false
      action('reports/fetch/' + this.$route.params.id, 'get')
        .then((reports) => {
          this.reports = reports
        })
    },
    fetchBatches () {
      this.tableReady = false
      if (!this.reports) return
      readMany('batches', this.query.batches)
        .then((data) => {
          this.batches = data.collection
          this.meta.batches = data.meta
        })
    },
    fetchReadings () {
      this.tableReady = false
      if (!this.batches) return
      readMany('readings', this.query.readings)
        .then((data) => {
          this.readings = data.collection
          // now we have readings, we can make the table ready
          this.tableReady = true
        })
    },
    setPage (i) {
      this.query.batches.page = i
    },
    /* eslint-disable */
    keys (col) {
      if (typeof col === 'object')
        return Object.keys(col).map((k) => typeof col[k])
      else
        console.warn('keys():col', 'not an object', typeof col, col)
    }
  },
  watch: {
    reports () {
      const q = {
        where: {
          report_id: this.reports[0].id
        },
        page: 1
      }
      Object.assign(this.query.batches, q)
      this.fetchBatches()
    },
    selectedReport (val) {
      const p = this.query.batches.page
      this.query.batches.page = 1
      if (p === 1) {
        this.fetchBatches()
      }
    },
    selectedPage () {
      this.fetchBatches()
    },
    batchList (val) {
      this.query.readings.filters[0].filter[1] = val
      this.fetchReadings()
    }
  }
}

export default vue
</script>

<template lang="jade">
#device-logs

  //- choose report
  div(v-if='reports.length')
    .form-group
      label.control-label Choose Report
      select.form-control(v-model='query.batches.where.report_id')
        option(v-for='report in reports', :value='report.id', track-by='$index') {{ report.label }}

  //- choose page
  div(v-if='readings.length && batches.length')
    .form-group
      label.control-label Choose Page
      select.form-control(v-model='query.batches.page')
        option(v-for='i in meta.batches.pages', :value='i + 1', track-by='$index') Page {{ i + 1 }}

  //- readings table
  div(v-if='batches.length && readings.length')
    h4 Readings

    .table-responsive(v-if='tableReady && cols && readings.length && cols && rows')
      table.table.table-bordered.table-striped
        thead
          tr(v-if='tableReady && cols.length')
            th Date/Time
            td(v-for='col in cols', track-by='$index', v-if='col && col.label') {{ col.label }}

        tbody
          tr(v-for='batch in rows', track-by='id', v-if='batch')
            td {{ batch.created_at }}
            td(v-for='col in batch.cols')
              //- debug(:debug='keys(col)')
              div(v-if='col.reading && col.param')
                span {{ col.reading.value }}
                span.small {{ col.param.units }}

  .alert.alert-info(v-if='!reports.length')
    h5 This device is not on any reports
  .alert.alert-info(v-if='reports.length && !batches.length')
    h5 This jobs have run for this device on this report
  .alert.alert-info(v-if='batches.length && !readings.length')
    h5 There are no readings for this device

  //- logs-reports(:device='device', :report.sync='report')
  //- logs-batches(:device='device', :report='report', :batch.sync='batch')
  //- logs-readings(:batch.sync='batch')
</template>
