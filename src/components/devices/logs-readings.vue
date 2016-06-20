<script>
import { readMany } from '../../services/store'

const vue = {
  name: 'DeviceLogsReadings',
  props: ['batch'],
  data () {
    return {
      readings: []
    }
  },
  computed: {
    query () {
      return {
        where: {
          batch_id: this.batch
        // },
        // orderBy: {
        //   column: 'created_at',
        //   direction: 'desc'
        }
      }
    }
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
#device-logs-batches
  .panel.panel-default
    .panel-heading
      h4.panel-title Readings
    .panel-body
      debug(:debug='readings')
    //- table.table.table-striped
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

<!--   computed: {
    params () {
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


-->
