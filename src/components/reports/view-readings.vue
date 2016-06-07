<script>
// todo: finish report readings
// paginate batches
// increment/decrement device
// reset device resets pagination

import { readMany } from 'restful-service'

var vue = {
  name: 'ReportsViewReadings',
  props: ['report', 'device'],
  data () {
    return {
      batches: [],
      query: {
        where: {
          // device_id: this.device.id,
          report_id: parseInt(this.$route.params.reportId)
        },
        orderBy: ['created_at', 'desc'],
        limit: 20,
        offset: 0,
        related: ['readings']
      }
    }
  },
  computed: {
    params () {
      return this.report.meta.params
    },
    deviceParams () {
      return this.device.device_model.device_definition.meta.params
    },
    columns () {
      return this.report.meta.params.reduce((ps, p) => {
        let param = this.deviceParams.find((dp) => dp.id === p)
        ps.push({ id: param.id, label: param.label })
        return ps
      }, [])
    },
    readings () {
      const readings = this.batches.reduce((bs, b) => {
        let row = this.columns.reduce((line, col) => {
          let _param = this.deviceParams.find((p) => p.id === col.id)
          let param = this.truncate(_param)
          let reading = b.readings.find((r) => r.parameter === col.id)
          let value = Object.assign({}, param, reading)
          // line.push(param)
          line.push(value)
          return line
        }, [])
        // row.unshift()
        bs.push(row)
        return bs
      }, [])
      return readings
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      readMany('batches', this.query)
        .then((batches) => {
          this.batches = batches
        })
    },
    truncate (param) {
      return {
        parameter: param.id,
        abbreviation: param.abbreviation,
        label: param.label,
        units: param.units
      }
    }
  },
  watch: {
    query: {
      deep: true,
      handler (val) {
        console.log('watch:query()', val)
        this.fetch()
      }
    },
    'device.id' (val) {
      console.log('watch:device()', val)
      this.query.where.device_id = parseInt(val)
    }
  }
}

export default vue
</script>

<template lang="jade">
#reports-view-readings
  .row
    .col-sm-12
      .table-responsive
        table.table.table-striped
          thead
            tr
              th Timestamp
              th(v-for='(i, col) in columns') {{ col.label }}
          tbody
            tr(v-for='(i, batch) in readings')
              td {{ batch[0].created_at }}
              td(v-for='reading in batch')
                | {{ reading.value }} &nbsp;
                small {{ reading.units }}




  //- debug(:debug='params', :label='"params"')
  //- debug(:debug='columns', :label='"columns"')
  debug(:debug='readings', :label='"readings"')
  //- debug(:debug='batches')
  //- select.form-control(v-model='deviceIndex')
  //-   option(value='') Select One
  //-   option(v-for='(i, device) in devices', :value='i') {{ device.label }}
</template>
