<script>
/* eslint-disable */
// workflow
// load report
// load devices: whereIn list
// select device
// load batches
// select page of batches
// load readings

import ModelMixin from '../../mixins/model'
import { readOne, readMany } from '../../services/adapter'

const vue = {
  name: 'ReportsView',
  resource: 'reports',
  mixins: [ModelMixin],
  autoLoad: 'route.data',
  data () {
    return {
      query: {
        related: ['device_model.device_definition']
      },
      queries: {
        devices: {
          filters: [{
            method: 'whereIn',
            filter: ['id', null]
          }],
          limit: 0,
          page: 1
        },
        batches: {
          where: { report_id: this.$route.params.id },
          limit: 2,
          page: 1
        },
        readings: {
          where: { 'device_id': null },
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
      devices: [],
      batches: [],
      readings: []
    }
  },
  computed: {
    batchList () {
      const bs = this.batches.map((b) => b.id)
      return bs
    },
    selectedDevice () {
      return this.queries.readings.where.device_id
    },
    selectedPage () {
      return this.queries.batches.page
    },
    cols () {
      console.log('cols', this.model.meta.params, this.model.meta.parameters)
      return this.model.meta.parameters
        .map((rp) => this.model.device_model.device_definition.meta.params.find((dp) => rp.id === dp.id))
    },
    rows () {
      if (!this.readings.length || !this.tableReady) return {}

      const report = this.model
      if (!report) return {}

      // device params
      const dmps = this.model.device_model.device_definition.meta.params
      console.log('dmps', dmps)

      // cols
      const rps = this.cols
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
  methods: {
    fetchDevices () {
      this.tableReady = false
      return readMany('devices', this.queries.devices)
        .then((data) => {
          this.devices = data.collection
          if (this.devices.length) {
            this.queries.readings.where.device_id = this.devices[0].id
          }
        })
    },
    fetchBatches () {
      this.tableReady = false
      return readMany('batches', this.queries.batches)
        .then((data) => {
          this.batches = data.collection
          this.meta.batches = data.meta
          return
        })
    },
    fetchReadings () {
      this.tableReady = false
      if (!this.batches && !this.queries.readings.where.device_id) return
      readMany('readings', this.queries.readings)
        .then((data) => {
          this.readings = data.collection
          // now we have readings, we can make the table ready
          this.tableReady = true
        })
    },
  //   setPage (i) {
  //     this.queries.batches.page = i
  //   },
  },
  watch: {
    model () {
      this.queries.devices.filters[0].filter[1] = this.model.meta.devices
      this.fetchDevices()
      this.fetchBatches()
    },
    // devices () {
    //   const q = {
    //     where: {
    //       device_id: this.model.device_model_id
    //     },
    //     page: 1
    //   }
    //   Object.assign(this.query.batches, q)
    //   this.fetchBatches()
    // },
    selectedDevice (val) {
      // const p = this.queries.batches.page
      this.queries.batches.page = 1
      // if (p === 1) {
      this.fetchReadings()
      // }
    },
    selectedPage () {
      console.log('selectedPage()')
      this.fetchBatches()
    },
    batchList (val) {
      this.queries.readings.filters[0].filter[1] = val
      this.fetchReadings()
    }
  }
}

export default vue
</script>

<template lang="jade">
#reports-view
  .container
    .row
      .col-xs-12(v-if='!isRequesting')
        //- debug(:debug='selectedDevice')
        //- debug(:debug='selectedPage')
        //- debug(:debug='batches')
        //- debug(:debug='batchList')
        //- debug(:debug='readings')
        debug(:debug='batchList')
        h4 {{ model.label }} &nbsp;
          span.small {{ model.device_model.label }}

        //- choose device
        div(v-if='devices.length')
          .form-group
            label.control-label Choose Device
            select.form-control(v-model='queries.readings.where.device_id')
              option(v-for='device in devices', :value='device.id', track-by='$index') {{ device.label }}

        //- choose page
        div(v-if='batches.length')
          .form-group
            label.control-label Choose Page
            select.form-control(v-model='queries.batches.page')
              option(v-for='i in meta.batches.pages', :value='i + 1', track-by='$index') Page {{ i + 1 }}

        //- readings table
        div(v-if='batches.length && readings.length')
          h4 Readings

          //- .table-responsive(v-if='tableReady && cols && readings.length && cols && rows')
          div
            table.table.table-bordered.table-striped
              thead
                //- tr
                tr(v-if='tableReady && cols.length')
                  th Date/Time
                  th(v-for='col in cols') {{ col.label }}
              tbody
                tr(v-for='batch in rows', track-by='id', v-if='batch')
                  td {{ batch.created_at }}
                  td(v-for='col in batch.cols')
                    div(v-if='col.reading && col.param')
                      span {{ col.reading.value }}
                      span.small {{ col.param.units }}

        //- else
        div(v-if='!batches.length || !readings.length')
          .alert.alert-info
            p There are no readings for this device on page {{ selectedPage }} of this report
</template>
